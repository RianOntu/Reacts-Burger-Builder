import * as actionTypes from './actionTypes';

const INITIAL_STATE={
    ingredients:[
        {type:"meat",amount:0},
        {type:"salad",amount:0},
        {type:"cheese",amount:0},
    ],
    totalPrice:80,
    purchasable:false,
    orders:[],
    orderLoading:true,
    orderErr:false,
    token:null,
    userId:null,
    authLoading:false,
    authErrMsg:null
}
export const INGREDIENT_PRICES={
    salad:20,
    meat:50,
    cheese:40
}
export const reducer=(state=INITIAL_STATE,action)=>{
    const ingredients=[...state.ingredients];
       switch(action.type){
           case actionTypes.add_ingredient:
           
          
             for(let item of ingredients){
                 if(item.type===action.payload){
                     item.amount++;
                 }
             }
             return {
                 ...state,
                 ingredients:ingredients,
                 totalPrice:state.totalPrice+INGREDIENT_PRICES[action.payload]
             }
        case actionTypes.remove_ingredient:
            for(let item of ingredients){
                if(item.type===action.payload){
                    if(item.amount<=0) {return state;}
                    
                    else{
                        item.amount--;
                    }
                    
                }
            }
            return {
                ...state,
                ingredients:ingredients,
                totalPrice:state.totalPrice-INGREDIENT_PRICES[action.payload]
            }
            case actionTypes.update_purchasable:
                const sum=state.ingredients.reduce((sum,element)=>{
                    return sum+element.amount
                },0);
                return {
                    ...state,
                    purchasable:sum>0
                }
                case actionTypes.reset_ingredients:
                    return {
                        ...state,
                        ingredients:[
                            {type:"meat",amount:0},
                            {type:"salad",amount:0},
                            {type:"cheese",amount:0},
                        ],
                        totalPrice:80,
                        purchasable:false
                    }
                    case actionTypes.load_orders:
                        let orders=[];
                        for(let key in action.payload){
                            orders.push({
                               ...action.payload[key],
                               id:key
                            });
                        }
                        return {
                            ...state,
                            orders:orders,
                            orderLoading:false
                        }
                        case actionTypes.orders_loading_failed:
                            return {
                                ...state,
                                orderErr:true,
                                orderLoading:false
                            }
                            case actionTypes.auth_success:
                                return {
                                    ...state,
                                    token:action.payload.token,
                                    userId:action.payload.userId
                                }
                                case actionTypes.auth_logout:
                                return {
                                    ...state,
                                    token: null,
                                    userId: null,
                                    authErrMsg:null
                                }
                                case actionTypes.auth_loading:
                                    return {
                                        ...state,
                                        authLoading:action.payload
                                    }
                                    case actionTypes.auth_failed:
                                        return {
                                            ...state,
                                            authErrMsg:action.payload
                                        }

          default:
              return state;
       }
}