import React from 'react';
import '../../css/styles.css';
import Tags from "./Tags";
import UserContext from '../../context/user'
import Register from '../Register/Register'
import {setUser} from './../../utils/storage';
import {connect} from 'react-redux';
import { setReduxUser } from '../../store/actions'


export class Login extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
          user:{
            name: '',
            surname: '',
            tags: [],
            isRegister: false,
          }
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        
    }

   



  componentDidMount(){

    const user = localStorage.getItem('userData');
    if(user !== null){
      this.props.setUserToRedux(user)
      const userReduxUpdate = this.props.setUserToRedux(user);
      console.log(userReduxUpdate)
      this.props.history.push("/advert");
    }
  }



  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    console.log(this.props);
    

    if (this.state.user.name.trim().length <= 3) {
      alert("The name must be bigger than 3 characters");
      return false;
    }
    if (this.state.user.surname.trim().length <= 3) {
      alert("The surname must be bigger than 3 characters");
      return false;
    }
    
    // this.context.updateUser(this.state.user);
    
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
      <div className="formContainer">
        <form className="formHome" onSubmit = {this.onSubmit}>
          <div className="field">
            <label className="label is-size-6"></label>
            <div className="control">
              <input className="input" type="text" placeholder="Name" name="name" onChange={this.onInputChange}/>
            </div>
          </div>

          <div className="field">
            <label className="label"></label>
            <div className="control">
              <input className="input" type="text" placeholder="Surnname" name="surname" onChange={this.onInputChange} />
            </div>
          </div>
        
        <Tags tagHandle={this.onInputChange}/>
        
        <div className="field is-grouped">
            <div className="control">
                <button className="button is-warning">Submit</button>
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