import React from "react";
import api from "../../utils/api";
import AdsList from "./AdsList"
import AdsListHook from "./AdsListHook"
import { Navbar, Button, Form, FormControl, Nav, Col, InputGroup  } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../../css/styles.css';
// import UserContext from '../../context/user';
// import {getUser} from '../../utils/storage'
import {connect} from 'react-redux';
import { fetchSearchAds } from '../../store/actions'




const {findAds, getTags, getTagsAds, getAds, getAdsbySearch } = api();

export class Adverts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ads:[],
      tags:[],
      tagSelected:"",
      price:"",
      type:"",
      loading: true,
      

    };
    
  }
  

  componentDidMount(){
  
  
    // const user = this.props.user
    // if(Object.keys(user).length === 0){
    //   // this.context.updateUser(user);
    //   this.props.history.push("/register");
    // }
    
    this.myTags();
    this.myAds();
    
  }
  
  
  myTags = () => {
    getTags().then (tag => 
        this.setState({
            tags: tag,
          })
        );

        
}

resetAds = () => {
  window.location.reload();
  // this.props.history.push('/advert')
  // getAds().then (ad =>
  //     this.setState({
  //       ads: ad
  //     })
  //   );
}


myAds = () => {

      // const user = this.props.user
      // if(Object.keys(user).length === 0){
      //   this.props.history.push("/register");
      //   return;
      // }
        
        // if(this.props.user.tags === this.props.ads.tag)
        getAds().then(ad =>
          this.setState({
            ads: ad
          })
        );
       
  
  };

 


  mySearch = () => {
    console.log(this.state.ads);
    console.log(this.state.tags);

    const {name, price, tagSelected, type} = this.state;

    // this.props.searchAds(name, price, tagSelected, venta)
    

      // this.props.searchAds(name, price, tagSelected, type).then(ad =>
      // this.setState({
      //   ads: ad
      // }),  
    // );

    getAdsbySearch(name, price, tagSelected, type).then(ad =>
      this.setState({
        ads: ad
      })
    );

    
  }
  


  search = (event) => {
    const query = event.target.value;
    if (query !== ''){
      return findAds(query).then(ad => this.setState({
        ads: ad
      }))
    }
    this.myAds();
    
  }

  onSubmit = (event) => {
    event.preventDefault();
    
    this.mySearch();

    
  }

  onInputChange = (event) => {
    const {name, value} = event.target;
    console.log(name, value)
    this.setState({
        [name]: value
      }
    );
  };


  render() {
    const { ads } = this.state;
    console.log(ads)
    // const  ads  = this.props.ads;
    const { tags } = this.state;
    // const searchAd = this.props.searchAd
    // console.log(searchAd)
    

    // if(loading){
        
    //     return null
    // }

    return (
      <React.Fragment >
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
            <Link to={`/editnew`}><Button variant="outline-info">New</Button></Link>
          </Form>
    </Nav>
  </Navbar.Collapse>
</Navbar>
<br/>


<Form  className="advancedSearch" onSubmit = {this.onSubmit} >
      <Form.Row>
        <Form.Group as={Col}  controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={this.onInputChange}
            type="text"
            placeholder="Name"
            name="name"
            defaultValue=""
            
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Tags</Form.Label>
          <Form.Control as="select" name="tagSelected" required autoFocus={true}  onChange={this.onInputChange}>
                    <option className="field" value="" >Choose your Tag</option>
            {
                tags.map(element =>(
                    
                    <option key={element}>  {element}</option> 
                // <option value={element}>{element}</option> 
                
                ))
            }
             </Form.Control>
        </Form.Group>
        
      </Form.Row>
      <Form.Row>
      <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Seller or Buyer</Form.Label>
          <Form.Control as="select" name="type" size="" autoFocus={true}  onChange={this.onInputChange}>
                    <option className="field" value="" name="" >Choose an option</option>
                    <option className="field"  value="sell" >Para comprar</option>
                    <option className="field"  value="buy" >Para vender</option>

          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}  controlId="validationCustomUsername">
          <Form.Label>Max Price</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              placeholder="€€€"
              min="1"
              name="price"
              aria-describedby="inputGroupPrepend"
              step="0.01"
              
              onChange={this.onInputChange}
            />
          </InputGroup>
          
        </Form.Group>
        
      </Form.Row>
      <Button className="buttonAdvancedSearc" variant="outline-info" type="submit">Submit form</Button>
      <br></br>
      <Button className="buttonReset" variant="outline-secondary" type="reset" onClick={this.resetAds}>Reset</Button>
    </Form>
       
        

        {

            ads 
            && 
            <AdsList ads={ads} />

          // searchAd? (
          //   <AdsList ads={searchAd} />
          // ):(
          //   <AdsList ads={ads} />
          // )


        }
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch)  {
  return{
    searchAds: (name, price, tagSelected, type) => dispatch(fetchSearchAds(name, price, tagSelected, type)),
    
  }
}

function mapStateToProps(state)  {
  return{
      user: state.user,
      ads: state.ads,
      isFetching: state.ui.isFetching,
      err: state.ui.err,
      searchAd: state.searchAd,
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Adverts);

// Adverts.contextType = UserContext;