import React from 'react';
import api from "../../utils/api";
import '../../css/bulma.css';
import '../../css/styles.css';
import { Link } from "react-router-dom";
import Tags from "../Register/Tags";
import { Nav, Navbar, Button, Form, ButtonGroup  } from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchSingleAd, editAds} from '../../store/actions'
import  '../../../node_modules/react-dropzone/examples/theme.css';
import Dropzone from 'react-dropzone'
import { withSnackbar } from 'notistack';


const { findAdByID, editAdvert, newAdvert, checkCookie, logOut } = api();

export class Editnew extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        advert: {
            name: "",
            description: "",
            type: "",
            price: 0,
            tags: [],
            photo: "",
            user: "",
        },
        login: {
          isLogged: false,

        }
        

    }
 
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    // this.findByID = this.findByID.bind(this);
    
  }

  componentDidMount(){

    checkCookie().then(cookie => {
      
      this.setState({
        advert: {
          ...this.state.advert,
          user: cookie._id,
          
        },
        login: {
          ...this.state.login,
          isLogged: true,
        }
        
      })
      
    }).catch(err =>{
      console.log(err)
      console.log(this.state.login)
      if(this.state.login.isLogged === false){
        this.props.history.push("/advert");
     }
    }
    )
   

  }

  onLogoutClick = () => {
    logOut().then(res => {
      this.setState({
        login: {
          ...this.state.login,
          isLogged: false,
        }
      })
      this.props.history.push("/advert");
    })
  }




  // findByID = (adId) =>{
  //   findAdByID(adId).then(ad => 
  //     this.setState({
  //       advert: {
  //           adId: ad._id,
  //           name: ad.name,
  //           type: ad.type,
  //           description: ad.description,
  //           price: ad.price,
  //           tags: ad.tags,
  //           photo: ad.photo,
  //           edit: true,
  //       },
  //    })
  //   )
  // }

test = (file) => {
  
  this.setState({    
    advert: {
      ...this.state.advert,
      photo: file

    }
  })
}
  onInputChange(event) {
    const { name, value } = event.target;
    
    
    this.setState({
        advert:{
            ...this.state.advert,
            [name]: value,
            
        }
    })
    // this.setState({
    //   advert: {
    //     ...this.state.advert,
    //     [name]: value
    //   }
    // });
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.state.advert)

    if (this.state.advert.name.trim().length < 5 || this.state.advert.name.trim().length > 30 ) {
      this.props.enqueueSnackbar('Name must be between 5 and 14 characters long', {variant: 'warning'});
      return false;
    }else if(!this.state.advert.description || this.state.advert.description.trim().length < 5 || this.state.advert.description.trim().length > 100){
      this.props.enqueueSnackbar('Description must be between 5 and 100 characters long', {variant: 'warning'});
      return false;
    }else if(this.state.advert.price === 0 || this.state.advert.price < 0){
      this.props.enqueueSnackbar('Price must be more than 0', {variant: 'warning'});
      return false
    }else if (!this.state.advert.photo){
      this.props.enqueueSnackbar('Photo is required to upload your product', {variant: 'warning'});
    }else {

      newAdvert(this.state.advert).then(res => {
        this.props.enqueueSnackbar('Product created!', {variant: 'success'});
        this.setState({   //Una vez creamos el anuncio dejamos el formulario en blanco
          advert: {
            name: '',
            description: '',
            tags: [],
            price: Number,
            type: '',
            photo: '',
            user: '',
          },
        })
  
  
      });


    }
    
    
    
    
  }
  
  

  render(){
    const { advert } = this.state;
    
   
     if(this.state.login.isLogged === false){
       return null && this.props.history.push("/advert");
     }

     

    return(
      <React.Fragment>
{/**********************  NAVBAR ***************************************/}

<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
<Link to="/advert"><Navbar.Brand>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5px' }}>
                <img
                  src="https://es.seaicons.com/wp-content/uploads/2015/09/Online-Shopping-icon.png"
                  width="38"
                  height="38"
                  className="d-inline-block align-top"
                  alt="WallaKeep"
                />{' '}
                <span className="navbar-tittle-wallaclone " style= {{ marginLeft: '5px' }} >Wallaclone</span>
            </div>
        </Navbar.Brand>
        </Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">

    </Nav>
    <Nav>
    
    <Form inline>

      {
          this.state.login.isLogged === false ?
          <ButtonGroup>
            <Link to={`/register`}><Button className="mr-sm-2 button is-primary is-outlined">register</Button></Link>
            <Link to={`/login`}><Button className="mr-sm-2 button is-primary">Login</Button></Link>
            </ButtonGroup>
          
        
          :
          <ButtonGroup>
            <Link to={`/newad`}><Button  className="mr-sm-2 button is-primary is-outlined"   >New product</Button></Link>
            <Button  className="mr-sm-2 button is-primary is-outlined"   >My ads</Button>
            <Button className="mr-sm-2 button is-warning is-outlined" onClick={this.onLogoutClick} >Logout</Button>
          </ButtonGroup>
      }
            
          </Form>
    </Nav>
  </Navbar.Collapse>
</Navbar>
<br/>
<br/>
<br/>
{/**********************  NAVBAR ***************************************/}
        
      {
        advert
        &&
        
        <div className="formContainer">
        <form className="formHome"  onSubmit = {this.onSubmit}>
          <div className="field">
            <label className="label is-size-6"></label>
            <div className="control">
                Tittle
              <input className="input" type="text" value={advert.name}  name="name" onChange={this.onInputChange}/>
            </div>
          </div>

          <div className="field">
            <label className="label"></label>
            <div className="control">
                Description
              <input className="input" type="text" placeholder={advert.description}  name="description" onChange={this.onInputChange} />
            </div>
          </div>

          <div className="field">
            <label className="label"></label>
            <div className="control">
                Price €:
              <input className="input" type="number" placeholder={advert.price} name="price" onChange={this.onInputChange} />
            </div>
          </div>

          <div className="field">
            <label className="label"></label>
            <div className="control">
                Buy or  Sell:
                <br></br>
                
                <Form.Group controlId="tagSelect">
                
                <Form.Control as="select" name="type" size="" autoFocus={true} required="required" controlId="typeSelected" onChange={this.onInputChange}>
                    <option className="field" value="" selected disabled></option>
                    <option value="buy">buy</option>
                    <option value="sell">sell</option>
           
             </Form.Control>
             </Form.Group>


            </div>
          </div>

            Tags:
          <Tags tagHandle={this.onInputChange} />

          <div className="field">
            <label className="label"></label>
            <div className="control">
            {/* Photo url:
            <input className="input" type="text" placeholder={advert.photo} name="photo" onChange={this.onInputChange}/>
                <div class="column is-6-desktop"><img src={`http://localhost:3001/${advert.adPhoto}`} alt=""/></div> */}
            </div>
          </div>
          {/* <MyDropzone name="dragdrop" value=""  onChange={this.onInputChange} ></MyDropzone> */}
              <Dropzone onDrop={acceptedFiles => {
                this.test(acceptedFiles)
              }
                }>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps({className: 'dropzone'})}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                  </section>
                )}
              </Dropzone>
          <br></br>
          
        
        <div className="field is-grouped">
            <div className="control">
                <button className="button is-primary">Submit</button>
            </div>
                      
        </div>
          
          </form>
        </div>
        
      }
     
     </React.Fragment>
    )}
}

function mapDispatchToProps(dispatch) {
  return {
    loadAd: id => dispatch(fetchSingleAd(id)),

    editAd: (id, advert) => dispatch(editAds(id, advert))
  }
}


function mapStateToProps(state)  {
  return{
      user: state.user,
      isFetching: state.isFetching,
      detailAd: state.detailAd
  }

}
export default withSnackbar (connect(mapStateToProps, mapDispatchToProps)(Editnew));