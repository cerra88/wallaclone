import React from 'react';
import '../../css/styles.css';
import Tags from "./Tags";
import UserContext from '../../context/user'
import Register from '../Register/Register'
import {setUser} from './../../utils/storage';
import {connect} from 'react-redux';
import { setReduxUser } from '../../store/actions'
import api from "../../utils/api";

const { findUser } = api();


export class Login extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
          user:{
            username: '',
            password: '',
            
          }
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        
    }
  



  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    console.log(this.props);
    

    if (this.state.user.username.trim().length <= 3) {
      alert("The name must be bigger than 3 characters");
      return false;
    }
    if(!this.state.user.password){
      alert("The password is required");
    }

      findUser(this.state.user)
      .then(res => {
          alert('Looged')
          this.props.history.push("/advert");
      })
      .catch(error => { 
        alert('invaild credentilas', error)
        this.props.history.push("/login");
      })
    
    

    
    // setUser(this.state.user);
    // this.props.setUserToRedux(this.state.user)

    return true;
  };

  onInputChange = (event) => {
    const {name, value} = event.target;
    
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    });
  };



  render(){
    // const { user } = this.state;
    // if (Object.entries(this.context.user).length !== 0) {
    //   return null;
    // }

    return(
      <React.Fragment>
      <div className="formContainer">
        <form className="formHome" onSubmit = {this.onSubmit}>
          <div className="field">
            <label className="label is-size-6"></label>
            <div className="control">
              <input className="input" type="text" placeholder="Username" name="username" onChange={this.onInputChange}/>
            </div>
          </div>
          <div className="field">
            <label className="label"></label>
            <div className="control">
              <input className="input" type="password" placeholder="Password" name="password" onChange={this.onInputChange} />
            </div>
          </div>
        
        <div className="field is-grouped">
            <div className="control">
                <button className="button is-warning">Login</button>
            </div>
                      
        </div>
          
          </form>
        </div>
      </React.Fragment>
      )
    }
    
  }


function mapDispatchToProps(dispatch)  {
  return{
      setUserToRedux: user => dispatch(setReduxUser(user))
  }

}

function mapStateToProps(state)  {
  return{
      user: state.user,
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Register.contextType = UserContext;