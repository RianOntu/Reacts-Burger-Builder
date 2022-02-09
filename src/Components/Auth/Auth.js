import React,{Component} from 'react';
import {Formik} from 'formik';
import {auth} from '../../redux/authActioncreators';
import {connect} from 'react-redux';
import Spinner from '../Spinner/Spinner';
import {Alert} from 'reactstrap';


const mapDispatchToProps=dispatch=>{
    return {
        auth:(email,password,mode)=>dispatch(auth(email,password,mode))
    }
}
const mapStateToProps=state=>{
    return {
        authLoading:state.authLoading,
        authErrMsg:state.authErrMsg
    }
}

class Auth extends Component{
    state={
        mode:"sign_up"
    }
    switchMode=()=>{
        this.setState({
            mode:this.state.mode==='sign_up'?"login":"sign_up"
        })
    }
    render(){
        let err=null;
        if(this.props.authErrMsg!==null){
          
                err=<Alert color="danger">{this.props.authErrMsg}</Alert>
                  
  
            
        }
        let form=null;
        if(this.props.authLoading){
           form=<Spinner />
        }
        else{
            form=(
              
          <Formik initialValues={{
              email:"",
              password:"",
              confirmPassword:""
          }}
          onSubmit={
              (values)=>{
                 this.props.auth(values.email,values.password,this.state.mode)
              }
          }
          validate={(values)=>{
              const errors={};
              if(!values.email){
                  errors.email='Required'
              }
              else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)){
                  errors.email='Invalid Email'

              }
              if(!values.password){
                  errors.password='Required'
              }
              else if(values.password.length<4){
              errors.password='Must be atleast 4 characters'
              }
              if(this.state.mode==='sign_up'){
                if(!values.confirmPassword){
                    errors.confirmPassword='Required'
                }
                else if(values.password!=values.confirmPassword){
                    errors.confirmPassword='Password field does not match'
                }
              }
      
              return errors;
          }}
          >
{({values,handleChange,handleSubmit,errors})=>(
    <div style={{
        
        margin:"auto",
        marginTop:"5%",
        border:"1px solid grey",
        padding:"70px",
        borderRadius:"7px"
    }}>
  <button className="btn btn-lg" style={{
      backgroundColor:"#D70F64",
      color:"white",
      width:"100%"
      
  }}onClick={this.switchMode}>Switch to {this.state.mode=='sign_up'?"Login":"Sign Up"}</button>
  <br/>
  <br/>
        <form onSubmit={handleSubmit}>
      
            <input name="email"
            placeholder="Enter Your Email"
            className="form-control mb-1"
            value={values.email}
            onChange={handleChange}/>
           <span style={{color:"red"}}>{errors.email}</span> 
            <br/>
            <input name="password"
            placeholder="Password"
            className="form-control mb-1"
            value={values.password}
            onChange={handleChange}/>
             <span style={{color:"red"}}>{errors.password}</span>
            <br/>
            {this.state.mode==='sign_up'?<div>
            <input name="confirmPassword"
            placeholder="Confirm Password"
            className="form-control mb-1"
            value={values.confirmPassword}
            onChange={handleChange}/>
             <span style={{color:"red"}}>{errors.confirmPassword}</span>
            <br/>
            <br />
            </div>:null}
      
            <button type="submit" className="btn btn-success d-block w-100 mx-auto">{this.state.mode==='sign_up'?"Sign Up":"Login"}</button>
        </form>
    </div>
)}
          </Formik>
              
            );
        }
        return (
            
            <div>
           
                {err}
               {form}
            </div>
        );
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);