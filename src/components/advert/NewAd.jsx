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
import {MyDropzone} from './DragDrop'
import Dropzone from 'react-dropzone'


const { findAdByID, editAdvert, newAdvert, checkCookie, logOut } = api();

export class Editnew extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        advert: {
            name: "",
            description: "",
            type: "",
            price: Number,
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
      console.log(cookie)
      this.setState({
        advert: {
          ...this.state.advert,
          user: cookie._id
    
        },
        login: {
          ...this.state.login,
          isLogged: true,
        }
        
      })
     
    }).catch(err =>
      console.log(err)
    )
   

  }

  onLogoutClick = () => {
    logOut().then(res => {
      this.setState({
        isLogged: false,
        username: '',
      })
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
  console.log(file)
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
    console.log(this.state)
    
    // console.log(this.state.advert._id)
    
    
    // if (this.state.edit === true) {
    //   console.log('paso')
    //   this.props.editAd(this.state.advert._id, this.state.advert)
  
    // }
    
    console.log(this.state)
    
    newAdvert(this.state.advert).then(res => {
      alert('Advert have been created');
      this.setState({   //Una vez creamos el anuncio dejamos el formulario en blanco
        advert: {
          name: '',
          description: '',
          tags: [],
          price: Number,
          type: '',
          photo: '',
          edit: false
        },
      })


    });
  }
  
  

  render(){
    const { advert } = this.state;
    console.log(this.state)
     if(!advert){
       return null
     }

     if(this.state.login.isLogged === false){
        this.props.history.push("/advert");
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
          this.state.isLogged === false ?
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
                Titulo
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
export default connect(mapStateToProps, mapDispatchToProps)(Editnew);