import React from 'react';
import BreadTop from  '../../../assets/images/top.png';
import BreadBottom from  '../../../assets/images/bottom.png';
import Meat from  '../../../assets/images/meat.png';
import Cheese from  '../../../assets/images/cheese.png';
import Salad from  '../../../assets/images/salad.png';
import './ingredient.css';

const Ingredient=props=>{
let ingredient=null;
switch(props.type){
    case 'bread-top':
        ingredient=<div><img src={BreadTop} /></div>;
        break;
   case 'bread-bottom':
       ingredient=<div><img src={BreadBottom} /></div>;    
       break;
       case 'meat':
        ingredient=<div><img src={Meat} /></div>;    
        break;
        case 'salad':
            ingredient=<div><img src={Salad} /></div>;    
            break;
            case 'cheese':
            ingredient=<div><img src={Cheese} /></div>;    
            break;
       default:
           ingredient=null;

}
    return (
        <div className="Ingredient">
        {ingredient}
        </div>
    );
}
export default Ingredient;