import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addIngedient=igtype=>{
    return {
        type:actionTypes.add_ingredient,
        payload:igtype
    }
}
export const removeIngredient=igtype=>{
    return {
        type:actionTypes.remove_ingredient,
        payload:igtype
    }
}
export const updatePurchasable=()=>{
   return {
    type:actionTypes.update_purchasable
   }
}
export const resetIngredients=()=>{
    return {
        type:actionTypes.reset_ingredients
    }
}
export const loadOrders=(orders)=>{
    return {
        type:actionTypes.load_orders,
        payload:orders
    }
}
export const orderLoadingFailed=()=>{
    return {
        type:actionTypes.orders_loading_failed
    }
}
export const fetchOrders=(token,userId)=>dispatch=>{
    const queryParam='&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://burger-builder-f4290-default-rtdb.firebaseio.com/orders.json?auth='+token+queryParam).then(response=>{
        dispatch(loadOrders(response.data));
    }).catch(err=>{
        dispatch(orderLoadingFailed())
    });
}