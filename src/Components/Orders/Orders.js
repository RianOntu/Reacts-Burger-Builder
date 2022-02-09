import React,{Component} from 'react';
import {fetchOrders} from '../../redux/actionCreators';
import {connect} from 'react-redux';
import Order from './Order/Order';
import Spinner from '../Spinner/Spinner';

const mapStateToProps=state=>{
    return {
        orders:state.orders,
        orderLoading:state.orderLoading,
        orderErr:state.orderErr,
        token:state.token,
        userId:state.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        fetchOrders:(token,userId)=>dispatch(fetchOrders(token,userId))
    }
}

class Orders extends Component{
    componentDidMount(){
        this.props.fetchOrders(this.props.token,this.props.userId);
    }
    componentDidUpdate(){
        console.log(this.props.orders);
    }
   
    render(){
        let orders=null;
        if(this.props.orderErr){
         orders=<p style={{textTransform:"capitalize",border:"1px solid grey",
         borderRadius:"5px",marginRight:"10px",padding:"5px",color:"red"}}>Sorry Failed To Load Orders!</p>
        }
        else{
            if(this.props.orders.length===0){
                orders=<p style={{textTransform:"capitalize",border:"1px solid grey",
                borderRadius:"5px",marginRight:"10px",padding:"5px",color:"red"}}>You have no orders!</p>
            }
            else{
                orders=  this.props.orders.map(order=>{
                    return <Order order={order} key={order.id} />
                 }); 
            }
          
        }
   
        return (
            <div>
                {this.props.orderLoading?<Spinner />:orders}
            </div>
        );
    }
 
}
export default connect(mapStateToProps,mapDispatchToProps)(Orders);