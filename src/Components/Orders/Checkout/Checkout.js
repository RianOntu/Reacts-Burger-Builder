import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Button,Modal,ModalBody,ModalFooter} from 'reactstrap';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import {resetIngredients} from '../../../redux/actionCreators';

const mapDispatchToProps=dispatch=>{
   return {
       resetIngredients:()=>dispatch(resetIngredients())
   }
}

const mapStateToProps=state=>{
    return {
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
        purchasable:state.purchasable,
        token:state.token,
        userId:state.userId
    }
}

class Checkout extends Component{
    state={
        values:{
            deliveryAddress:"",
            paymentType:"Bkash",
            phone:""
        },
        isLoading:false,
        isModalOpen:false,
        modalMsg:""
    }
    goBack=()=>{
        this.props.history.goBack("/");
    }
    changeWithInput=e=>{
        this.setState({
            values:{
                ...this.state.values,
                [e.target.name]:e.target.value


            }
        });
    }
    handleSubmit=()=>{
        this.setState({
            isLoading:true
        });
       const order={
           ingredients:this.props.ingredients,
           customer:this.state.values,
           price:this.props.totalPrice,
           userId:this.props.userId,
           orderTime:new Date()
       }
       axios.post('https://burger-builder-f4290-default-rtdb.firebaseio.com/orders.json?auth='+this.props.token,order).then(response=>{
           if(response.status==200){
               this.setState({isLoading:false,
                isModalOpen:true,
                modalMsg:"Order Placed Successfully"
            });
            this.props.resetIngredients();
           }
           else{
            this.setState({isLoading:false,
                isModalOpen:true,
                modalMsg:"Something Went Wrong.Order again"
            });
           }
       }).catch(err=>{
           if(err){
               this.setState({isLoading:false,
                isModalOpen:true,
                modalMsg:"Something Went Wrong.Order again"
            });
           }
       });
    }
           render(){
               let form=(
                   <div>
                         <h4 style={{
                        border:"1px solid grey",
                        boxShadow:"1px 1px #888888",
                        borderRadius:"5px",
                        padding:"20px"
                    }}>Payment:{this.props.totalPrice} BDT</h4>
                    <form style={{
                        border:"1px solid grey",
                        boxShadow:"1px 1px #888888",
                        borderRadius:"5px",
                        padding:"20px",
                        paddingBottom:"50px"
                    }}>
                        <h1 style={{textAlign:"center",marginBottom:"5%"}}>Checkout</h1>
                        <textarea name="deliveryAddress" value={this.state.values.deliveryAddress} className="form-control" placeholder="Your Address" onChange={this.changeWithInput}>

                        </textarea>
                        <br/>
                        <input name="phone" className="form-control" placeholder="Your Phone Number" value={this.state.values.phone} onChange={this.changeWithInput}/>
                        <br/>
                        <select name="paymentType" className="form-control" value={this.state.values.paymentType} onChange={this.changeWithInput}>
                            <option value="Cash On Delivery">Cash On Delivery</option>
                            <option value="Bkash">Bkash</option>
                        </select>
                        <Button style={{backgroundColor:"#D70F64"}} className="mr-auto mt-3"  onClick={this.handleSubmit} disabled={!this.props.purchasable}>Place Order</Button>
                        <Button color="danger" className="ml-2 mt-3" onClick={this.goBack}>Cancel</Button>
                    </form>

                   </div>
               );
            return (
             
                   <div>
                       {this.state.isLoading?<Spinner />:form}
                       <Modal isOpen={this.state.isModalOpen}>
                           <ModalBody>
                               {this.state.modalMsg}
                           </ModalBody>
                           <ModalFooter>
                               <Button onClick={this.goBack}>Go Back</Button>
                           </ModalFooter>
                       </Modal>
                   </div>
             
            );
           }
}
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);