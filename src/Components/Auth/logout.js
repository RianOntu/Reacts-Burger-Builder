import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {logOut} from '../../redux/authActioncreators';

const mapDispatchToProps=dispatch=>{
    return {
        logOut:()=>dispatch(logOut())
    }
}
class Logout extends Component{
    componentDidMount(){
        this.props.logOut();
    }
    render(){
        return (<Redirect to='/login' />);
    }
}
export default connect(null,mapDispatchToProps)(Logout);
