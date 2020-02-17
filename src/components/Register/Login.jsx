import React from 'react';
// import '../../css/styles.css';
import '../../css/bulma.css';
// import Tags from "./Tags";
import UserContext from '../../context/user'
import Register from '../Register/Register'
// import {setUser} from './../../utils/storage';
import {connect} from 'react-redux';
import { setReduxUser } from '../../store/actions'
import api from "../../utils/api";
import { withSnackbar } from 'notistack';

const { findUser, checkCookie } = api();


export class Login extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
          userCookie:{
            id: '',
            username: '',
            email: '',
            isLogged: false,
            
          },

          user: {
            username: '',
            password: '',
            
          }
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        
        
    }
  
    componentDidMount(){
      checkCookie().then(user => {
        this.setState({
          //guardo el user en el state por si me hace falta.
          userCookie:{
            id: user._id,
            username: user.username,
            email: user.email,
            isLogged: true,
          }
        })


      }).catch(err =>
        console.log(err)
      )
      
      
      
      
      }

      


  onSubmit = (event) => {
    event.preventDefault();
    

    if (this.state.user.username.trim().length < 5 || this.state.user.username.trim().length > 14 ) {
      this.props.enqueueSnackbar('Username must be between 5 and 14 characters long', {variant: 'warning'});
    }else if(!this.state.user.password || this.state.user.password.trim().length < 5 || this.state.user.password.trim().length > 14){
      this.props.enqueueSnackbar('The password must be between 5 and 14 characters long', {variant: 'warning'});
      return false;
    }else {
      findUser(this.state.user)
      .then(res => {
          this.props.history.push("/advert");
      })
      .catch(error => { 
        this.props.enqueueSnackbar('Password is incorrect', {variant: 'error'});
        this.props.history.push("/login");
      })

    }
    
    

    
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

    //ahora si hay usuario, entonces redirigo a advert, sino le mantengo para que pueda hacer login.
    if (this.state.userCookie.isLogged === true){
      this.props.history.push("/advert");
    }

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
              <input className="input" type="password" placeholder="Password" name="password" onChange={this.onInputChange} />
            </div>
          </div>
        
        <div className="field is-grouped">
            <div className="control">
                <button className="button is-warning">Login</button>
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
                        <big>Login</big>
                          <br></br>
                          <br></br>
                            <div className="field">
                                <div className="control">
                                <input className="input" type="text" placeholder="Username" name="username" onChange={this.onInputChange}/>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                <input className="input" type="password" placeholder="Password" name="password" onChange={this.onInputChange} />
                                </div>
                            </div>
                           
                            <br></br>
                            <button className="button is-block is-primary  is-fullwidth">Login <i className="fa fa-sign-in" aria-hidden="true"></i></button>
                        
                    </div>
                    <br></br>
                    <p className="has-text-grey">
                        <a href="/register">Register</a> &nbsp;·&nbsp;
                        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                        <br></br>
                        <a href="/advert">See our products</a>
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

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(Login));

Register.contextType = UserContext;