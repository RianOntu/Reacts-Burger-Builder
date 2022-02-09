import React,{Component} from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import {Modal,ModalBody,ModalHeader,ModalFooter,Button} from 'reactstrap';
import Summary from './Summary/Summary';

import {connect} from 'react-redux';
import {addIngedient,removeIngredient,updatePurchasable} from '../../redux/actionCreators';

const mapStateToProps=state=>{
    return {
        ingredients:state.ingredients,
        totalPrice:state.totalPrice,
        purchasable:state.purchasable
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        addIngedient:(igtype)=>dispatch(addIngedient(igtype)),
        removeIngredient:(igtype)=>dispatch(removeIngredient(igtype)),
        updatePurchasable:()=>dispatch(updatePurchasable())
    }
}



class BurgerBuilder extends Component{
    state={
    
      isModalOpen:false
 
    }

    addIngredients=type=>{
      this.props.addIngedient(type);  
      this.props.updatePurchasable();
    }

    removeIngredients=type=>{
        this.props.removeIngredient(type);
        this.props.updatePurchasable();
    }
modalToggle=()=>{
    this.setState({
        isModalOpen:!this.state.isModalOpen
    })
}
handleCheckout=()=>{
    this.props.history.push('/checkout');
}
    render(){
        return (
        <div>
                <div className="d-flex flex-md-row flex-column">
               <Burger ingredients={this.props.ingredients}/>
               <Controls added={this.addIngredients} removed={this.removeIngredients} price={this.props.totalPrice} toggle={this.modalToggle} purchasable={this.props.purchasable}/>
            </div>
          <Modal isOpen={this.state.isModalOpen}>
              <ModalHeader>
                  <h5>Your Order Summery</h5>
              </ModalHeader>
              <ModalBody>
                  <h6>Total Price : {this.props.totalPrice} BDT</h6>
                  <Summary ingredients={this.props.ingredients} />
              </ModalBody>
              <ModalFooter>
                 <Button  style={{backgroundColor:"#D70F64"}} className="btn" onClick={this.handleCheckout}>Continue to checkout</Button>
                 <Button className="btn btn-primary" onClick={this.modalToggle}>Cancel</Button>
              </ModalFooter>
          </Modal>
        </div>
        );
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);