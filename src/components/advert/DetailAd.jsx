import React from 'react';
import '../../css/bulma.css';
import '../../css/styles.css';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {fetchSingleAd} from '../../store/actions'
import api from "../../utils/api";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa"
import { FacebookShareButton, TwitterIcon, FacebookShareCount} from 'react-share'
import Moment from 'react-moment';

import { Nav, Navbar, Button, ButtonToolbar, Form, FormControl, ButtonGroup  } from 'react-bootstrap';

const {logOut, checkCookie, deleteAdvert } = api();


// const { findAdByID } = api();

export class DetailAd extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      isLogged: false,
      username: '',
    }
    
  }

  componentDidMount(){

    checkCookie().then(user => {
      this.setState({
        isLogged: true,
        username: user.username,
        id: user._id
      })
    }).catch(err =>
      console.log(err)
    )
    // const user = this.props.user;
    // if(Object.keys(user).length === 0){
    //   this.props.history.push("/register");
    // }


    // const userFromContext = this.context.user;
    // console.log('usuario del contexto es: ', userFromContext);
    // if(Object.entries(userFromContext).length === 0){
    //   this.props.history.push("/register");
    // }

    const adId = this.props.match.params.adId;
    // this.findByID(adId).then(ad => {
    //   this.setState({
    //     isLogged: true,
    //     username: user.username
    //   })
    // }).catch(err =>
    //   console.log(err)
    // )
    this.props.loadAd(adId)    
  }

  onLogoutClick = () => {
    logOut().then(res => {
      this.setState({
        isLogged: false,
        username: '',
      })
    })
  }


  

  

  dateFromObjectId = (objectId) => {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};

onDeleteClick = () => {
  const id = this.props.match.params.adId;
  console.log("paso y el id es: ", id)
  deleteAdvert(id).then(res => {
    this.props.enqueueSnackbar('Product deleted', {variant: 'success'});
    this.props.history.push("/advert");

    }).catch(err => {
      this.props.enqueueSnackbar('An error occurred during delete your product', {variant: 'error'});
    })
  }

  render(){
    // const { ad } = this.state;
    const ad  = this.props.detailAd;
    console.log("el ad es: ", ad)
    console.log("state i es: ", this.state.id)



    

    if(!ad){
      return null
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

        
      {
        ad 
        &&
       
        <section className="section">
        <div className="container">
        
        <div className="row" style = {{ display: 'flex', justifyContent: '', margin: '10px', alignItems: 'center'  }}>
        
                <FaUserCircle size="3em"></FaUserCircle>
                
                <div style={{  }}>
                  <h4 className="tagButton" variant="outline-info"  size="sm">{ JSON.stringify(ad.user.username).replace(/['"]+/g, '')}</h4>
                  <small className="tagButton" variant="outline-info"  size="sm">{ ad.user.email}</small>
                </div> 
                
          </div>
          
          <br></br>
          <div className="columns is-desktop is-vcentered">
            <div className="column is-6-desktop"><img src={`http://localhost:3001/${ad.photo}`} alt="" style={{ borderRadius: '5%'  }}/></div>
            <div className="column is-6-desktop">
              <div className="level is-mobile">
                
              </div>
              <h2 className="title is-spaced">{ad.name}</h2>
              <p className="subtitle">{ad.description}</p>
              <ButtonToolbar>
                        {
                            ad.tags.map(tag => (
                            
                            <Button key={tag} className="tagButton" variant="outline-info"  size="">{tag}</Button>
                            ))
                        }

                </ButtonToolbar>
                <br></br>
              <div className="columns">
                <div className="column is-half">
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <h4 className="title-price">{ad.price}€</h4>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">

                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          {/* <button className="button is-primary">To: {ad.type}</button> */}
                          {
                            ad.type === "sell" ?(
                            <Button className="button is-primary" variant="info" >Vendo</Button>
                            ):
                            (<Button className="button is-warning" variant="warning" >Compro</Button>)

                        }
                        </div>
                      </div>
                     {
                          ad.user.username === this.state.username ?
                          <React.Fragment>
                          <div><Link to={`/editad/${ad._id}`}> <Button className="mr-sm-2 button is-outlined is-info" variant="outline-secondary">Edit</Button></Link></div>
                          <div><Button className="mr-sm-2 button is-danger is-outlined customDeleted" style={{}} onClick={this.onDeleteClick}>Delete</Button></div>
                          </React.Fragment>
                          :

                          <span></span>
                     } 
                      
                    </div>
                  </div>
                </div>
              </div>
              <hr/>
              <div className="level is-mobile" style={{ display: 'flex', justifyContent: 'space-around' }}>
              <text><Moment format="DD/MM/YYYY HH:mm">{this.dateFromObjectId(ad._id)}</Moment></text>

              {/* <FacebookShareCount url={'https://es-es.facebook.com/wallapop'}/> */}
              {/* <Link to={`/advert`}><FaArrowLeft size="2em" color="black"></FaArrowLeft></Link> */}
            
                <div className="level-left">
                  
                  <br></br>

                  
                  
                  {/* <small>{ad.user}</small> */}
                </div>
                <div className="level-right">
                  {/* <div class="level-item">Share</div><a class="level-item" href="#"><img src="placeholder/icons/facebook-f.svg" alt=""/></a><a class="level-item" href="#"><img src="placeholder/icons/twitter.svg" alt=""/></a><a class="level-item" href="#"><img src="placeholder/icons/instagram.svg" alt=""/></a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        
      }
     
     </React.Fragment>
    )}
  
  
}


function mapDispatchToProps(dispatch) {
  return {
    loadAd: id => dispatch(fetchSingleAd(id)),
  }
}


function mapStateToProps(state)  {
  return{
      user: state.user,
      isFetching: state.isFetching,
      detailAd: state.detailAd
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(DetailAd);


