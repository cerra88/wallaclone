import React from "react";
import api from "../../utils/api";
import AdsList from "./AdsList"
// import '../../css/bulma.css';
import { Navbar, Button, Form, Nav, Col, InputGroup, ButtonGroup  } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../../css/styles.css';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
// import UserContext from '../../context/user';
// import {getUser} from '../../utils/storage'
import {connect} from 'react-redux';
import { fetchSearchAds } from '../../store/actions'





const {findAds, getTags, checkCookie, getAds, getAdsbySearch, logOut, getAdsByUser } = api();

export class MyAds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      ads:[],
      userAds: [],
      tagSelected:"",
      price:"",
      type:"",
      loading: true,
      currentPage: 1,
      postsPerPage: 6,
      isLogged: false,
      username: '',

    };

  
  
}
  

  componentDidMount(){
    
    checkCookie().then(user => {
      this.setState({
        isLogged: true,
        username: user.username,
        id: user._id
      })
      this.myAds();
    }).catch(err =>
      console.log(err)
    )
  
    // this.myTags();
    
    
    
  }

  onLogoutClick = () => {
    logOut().then(res => {
      this.setState({
        isLogged: false,
        username: '',
      })
      this.props.history.push("/advert");
    }).catch(err => {
        
    })
    
    // this.props.history.pushState(null, '/advert');
  }
  
  
//   myTags = () => {
//     getTags().then (tag => 
//         this.setState({
//             tags: tag,
//           })
//         );       
// }

// resetAds = () => {
//   window.location.reload();
//   // this.props.history.push('/advert')
//   // getAds().then (ad =>
//   //     this.setState({
//   //       ads: ad
//   //     })
//   //   );
// }


myAds = () => {

      // const user = this.props.user
      // if(Object.keys(user).length === 0){
      //   this.props.history.push("/register");
      //   return;
      // }
        
        // if(this.props.user.tags === this.props.ads.tag)
        console.log(this.state.id)
        getAdsByUser(this.state.id).then(ad =>
                this.setState({
                    ads: ad
                  })
          
        );
    
       
  
  };

 


//   mySearch = () => {
//     console.log(this.state.ads);
//     console.log(this.state.tags);

//     const {name, price, tagSelected, type} = this.state;

//     // this.props.searchAds(name, price, tagSelected, venta)
    

//       // this.props.searchAds(name, price, tagSelected, type).then(ad =>
//       // this.setState({
//       //   ads: ad
//       // }),  
//     // );

//     getAdsbySearch(name, price, tagSelected, type).then(ad =>
//       this.setState({
//         ads: ad
//       })
//     );

    
//   }
  


//   search = (event) => {
//     const query = event.target.value;
//     if (query !== ''){
//       return findAds(query).then(ad => this.setState({
//         ads: ad
//       }))
//     }
//     this.myAds();
    
//   }

//   onSubmit = (event) => {
//     event.preventDefault();
    
//     this.mySearch();

    
//   }

//   onInputChange = (event) => {
//     const {name, value} = event.target;
//     console.log(name, value)
//     this.setState({
//         [name]: value
//       }
//     );
//   };

  


  onPageChange = (page) => {
    this.setState({
      currentPage: page,
    });

  }


  render() {
    console.log(this.state)
    const { ads } = this.state;
    
    const adsFiltered = ads.filter(ad => ad.user !== null)
    console.log('ads filter: ', adsFiltered)

    // const indexOfLastAds = this.state.currentPage * this.state.postsPerPage;
    // const indexOfFirstAds = indexOfLastAds - this.state.postsPerPage;
    // const currentAds = ads.slice(indexOfFirstAds, indexOfLastAds);
    // const  ads  = this.props.ads;
    // const { tags } = this.state;
    // const searchAd = this.props.searchAd
    // console.log(searchAd)
    

    // if(loading){
        
    //     return null
    // }

    return (
      <React.Fragment >

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
            <Link to={`/myads`}><Button  className="mr-sm-2 button is-primary is-outlined"   >My ads</Button></Link>
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


{/* 
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
          <Form.Control as="select" name="tagSelected"  autoFocus={true}  onChange={this.onInputChange}>
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
      <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Seller or Buyer</Form.Label>
          <Form.Control as="select" name="type" size="" autoFocus={true}  onChange={this.onInputChange}>
                    <option className="field" value="" name="" >Choose an option</option>
                    <option className="field"  value="sell" >Venta de articulos</option>
                    <option className="field"  value="buy" >Demanda de articulos</option>

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
      <Button className="buttonAdvancedSearc" variant="outline-info" type="submit">Search</Button>
      <br></br>
      <Button className="buttonReset" variant="outline-secondary" type="reset" onClick={this.resetAds}>Reset</Button>
    </Form> */}
        {
            adsFiltered

            && 
              <AdsList ads={adsFiltered} />
              
              
        }
          <Pagination style={{ display: 'flex', justifyContent: 'center' }} onChange={this.onPageChange} current={this.state.currentPage} total={ Math.ceil(this.state.ads.length / this.state.postsPerPage)*10 } />
        
        
        <br></br>
        <br></br>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyAds);

// Adverts.contextType = UserContext;