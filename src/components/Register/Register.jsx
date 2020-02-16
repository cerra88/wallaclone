import React from 'react';
import '../../css/styles.css';
import Tags from "./Tags";
import UserContext from '../../context/user'
import Register from '../Register/Register'
import {setUser} from './../../utils/storage';
import {connect} from 'react-redux';
import { setReduxUser } from '../../store/actions'
import api from "../../utils/api";

const { newUser } = api();


export class Login extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
          user:{
            username: '',
            email: '',
            pass: '',
            
          }
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        
    }

   



  componentDidMount(){

    // const user = localStorage.getItem('userData');
    // if(user !== null){
    //   this.props.setUserToRedux(user)
    //   const userReduxUpdate = this.props.setUserToRedux(user);
    //   console.log(userReduxUpdate)
    //   this.props.history.push("/advert");
    }
  



  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    console.log(this.props);
    

    if (this.state.user.username.trim().length <= 3) {
      alert("The name must be bigger than 3 characters");
      return false;
    }
    if (this.state.user.email.trim().length <= 3) {
      alert("The surname must be bigger than 3 characters");
      return false;
    }
    
    // this.context.updateUser(this.state.user);

    try {
      newUser(this.state.user).then()
    } catch (error) {
      console.log(error)
    }
    

    this.props.history.push("/advert");
    setUser(this.state.user);
    this.props.setUserToRedux(this.state.user)

   
    
    
    
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
      {/* <div className="formContainer">
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
              <input className="input" type="email" placeholder="email@gmail.com" name="email" onChange={this.onInputChange} />
            </div>
          </div>
        
          <div className="field">
            <label className="label"></label>
            <div className="control">
              <input className="input" type="password" placeholder="Password" name="pass" onChange={this.onInputChange} />
            </div>
          </div>
        
        <div className="field is-grouped">
            <div className="control">
                <button className="button is-warning">Submit</button>
            </div>
                      
        </div>
          
          </form>
        </div> */}

<form  onSubmit = {this.onSubmit}>
<section className="hero  is-fullheight">
        <div className="hero-body">
            <div className="container has-text-centered">
                <div className="column is-4 is-offset-4">
                    <h3 className="title has-text-black"></h3>
                    {/* <hr className="login-hr"/> */}
                    <br></br>
                    <p className="subtitle has-text"></p>
                    <div className="">
                        <figure className="avatar">
                            <img src="https://es.seaicons.com/wp-content/uploads/2015/09/Online-Shopping-icon.png"/>
                        </figure>
                          <br></br>
                            <div className="field">
                            <div className="control">
                              <input className="input" type="text" placeholder="Username" name="username" onChange={this.onInputChange} />
                              </div>
                            </div>

                            <div className="field">
                              <label className="label"></label>
                              <div className="control">
                                <input className="input" type="email" placeholder="email@gmail.com" name="email" onChange={this.onInputChange} />
                              </div>
                            </div>

                            <div className="field">
                              <label className="label"></label>
                              <div className="control">
                                <input className="input" type="password" placeholder="Password" name="pass" onChange={this.onInputChange} />
                              </div>
                            </div>
                           
                            <br></br>
                            <button className="button is-block is-primary  is-fullwidth">Register <i className="fa fa-sign-in" aria-hidden="true"></i></button>
                        
                    </div>
                    <br></br>
                    <p className="has-text-grey">
                        <a href="../">Sign Up</a> &nbsp;·&nbsp;
                        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                        <a href="../">Need Help?</a>
                    </p>
                </div>
            </div>
        </div>
    </section>
    </form>
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