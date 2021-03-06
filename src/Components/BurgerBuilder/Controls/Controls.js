import React from 'react';
import {Card,CardBody,CardFooter,CardHeader,Button} from 'reactstrap';

let controls=[
    {label:"Salad",type:"salad"},
    {label:"Meat",type:"meat"},
    {label:"Cheese",type:"cheese"}
];

const BuildControl=props=>{
    return (
        <div className="d-flex">
            <div className="mr-auto ml-5 mt-2" style={{fontWeight:"bold",fontSize:"1.2rem"}}>{props.label}</div>
            <button className="btn btn-danger btn-sm m-1" onClick={props.removed}>Less</button>
            <button className="btn btn-success btn-sm m-1" onClick={props.added}>More</button>
        </div>
        

        
    );
}

const Controls=props=>{
    return (
        <div className="container ml-md-5" style={{textAlign:"center"}}>
            <Card style={{marginTop:"30px",marginBottom:"30px",textAlign:"center"}}>
                <CardHeader style={{backgroundColor:"#D70F64",color:"white"}}>
                    <h4>Add Ingredients</h4>
                </CardHeader>
                <CardBody>
                {
                    controls.map(item=>{
                       return  <BuildControl label={item.label} type={item.type} key={Math.random()} added={()=>props.added(item.type)}  removed={()=>props.removed(item.type)}/>
                    })
                }
                </CardBody>
                <CardFooter>
                    <h5>Price:<strong>{props.price}</strong> BDT</h5>
                    <Button disabled={!props.purchasable} className="d-block w-100 mt-3" onClick={props.toggle} style={{backgroundColor:"#D70F64"}}>Order Now</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
export default Controls;