import React from 'react';

const Order=props=>{
    const ingredientSummary=props.order.ingredients.map(item=>{
        return <span key={item.type} style={{textTransform:"capitalize",border:"1px solid grey",
    borderRadius:"5px",marginRight:"10px",padding:"5px"}}>{item.amount} x {item.type}</span>
        })
    return (
        <div style={{
            border:"1px solid grey",
            boxShadow:"1px 1px black",
            marginBottom:"10px",
            padding:"20px",
            borderRadius:"5px"
        }}>
                    <p>Order Number : {props.order.id}</p>
                    <p>Delivery Address : {props.order.customer.deliveryAddress}</p>
                 {ingredientSummary}
                 <br />
                 <br />
                    <p>Total : {props.order.price} BDT</p>
                    <hr />
        </div>
    );
}
export default Order;