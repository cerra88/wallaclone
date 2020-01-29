import React from 'react';
import api from "../../utils/api";
import '../../css/bulma.css';
import '../../css/styles.css';
import { Link } from "react-router-dom";
import Tags from "../Register/Tags";
import { Nav, Navbar, Button, Form, FormControl  } from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchSingleAd, editAds} from '../../store/actions'


const { findAdByID, editAdvert, newAdvert } = api();

export class Editnew extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        advert: {
            name: "",
            description: "",
            venta: "",
            price: "",
            tags: [],
            photo: "",
            
        },
        edit: false,
    }
 
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.findByID = this.findByID.bind(this);
  }

  componentDidMount(){
    const user = this.props.user;
    if(Object.keys(user).length === 0){
      this.props.history.push("/register");
    }

    const adId =this.props.match.params.adId;
    console.log('adId es:', adId)

    if(adId === undefined){
        console.log('adId es undefined, no hago setState y cargo el form con datos vacios')

    }else{
        console.log('llamo a la función de redux para que me traiga el ad')
        this.props.loadAd(adId)  
        console.log(this.props.detailAd)
        this.setState({
          advert: this.props.detailAd,
          edit: true
        }) 
        // this.findByID(adId);
        
        
    }

  }
  
//   componentDidMount(){
    
//     const adId = this.props.match.params.adId;
    
//   }

  findByID = (adId) =>{
    findAdByID(adId).then(ad => 
      this.setState({
        advert: {
            adId: ad._id,
            name: ad.name,
            type: ad.type,
            description: ad.description,
            price: ad.price,
            tags: ad.tags,
            photo: ad.photo,
            edit: true,
        },
     })
    )
  }

  onInputChange(event) {
    const { name, value } = event.target;
    
    this.setState({
        advert:{
            ...this.state.advert,
            [name]: value

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
    console.log(this.state.advert._id)
    
    
    if (this.state.edit === true) {
      console.log('paso')
      this.props.editAd(this.state.advert._id, this.state.advert)
      // return editAdvert(this.state.advert._id, this.state.advert)
      //   .then((res) => {
      //     alert('Advert have been updated')
      //   })

    }
    
    newAdvert(this.state.advert).then(res => {
      alert('Advert have been created');
      this.setState({   //Una vez creamos el anuncio dejamos el formulario en blanco
        advert: {
          name: '',
          description: '',
          tags: [],
          price: '',
          type: '',
          photo: '',
          edit: false
        },
      })
    });
  }
  
  

  render(){
    const { advert } = this.state;
    console.log(advert)

    

     if(!advert){
       return null
     }

    return(
      <React.Fragment>
         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
<Link to="/advert"><Navbar.Brand>
            <img
              src="https://es.seaicons.com/wp-content/uploads/2015/09/Online-Shopping-icon.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="WallaKeep"
            />{' '}
            WallaKeep
        </Navbar.Brand>
        </Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      
    </Nav>
    <Nav>
    <Form inline>
            <FormControl type="text" placeholder="Search" onKeyUp={this.search} className="mr-sm-2" />
            <Button variant="outline-info">New</Button>
          </Form>
    </Nav>
  </Navbar.Collapse>
</Navbar>
        
      {
        advert
        &&
        
        <div className="formContainer">
        <form className="formHome"  onSubmit = {this.onSubmit}>
          <div className="field">
            <label className="label is-size-6"></label>
            <div className="control">
                Ad Name
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
                <select className="select" name="type" placeholder={advert.type} onChange={this.onInputChange}>
                            <option value="buy">buy</option>
                            <option value="sell">sell</option>
                          </select>
            </div>
          </div>

            Tags:
          <Tags tagHandle={this.onInputChange} />

          <div className="field">
            <label className="label"></label>
            <div className="control">
            Photo url:
            <input className="input" type="text" placeholder={advert.photo} name="photo" onChange={this.onInputChange}/>
                <div class="column is-6-desktop"><img src={`http://localhost:3001/${advert.adPhoto}`} alt=""/></div>
            </div>
          </div>

          
        
        <div className="field is-grouped">
            <div className="control">
                <button className="button is-warning">Submit</button>
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