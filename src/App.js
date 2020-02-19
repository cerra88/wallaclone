import React from 'react';
import Register from "./components/Register/Register";
import Login from "./components/Register/Login";
import List from "./components/advert/List"
import DetailAd from "./components/advert/DetailAd"
import NewAd from "./components/advert/NewAd"
import ErrorBoundary from "./components/advert/ErrorBundary"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux';
import { connect } from 'react-redux';
// import api from './utils/api'
import {Alert} from 'react-bootstrap';
import ReactSpinner from 'react-bootstrap-spinner'
import {fetchAds} from './store/actions'
import { SnackbarProvider } from 'notistack';
import EditAd from './components/advert/EditAd';



export class App extends React.Component {

  
  componentDidMount() {
    this.loadAds();
  }

  loadAds = this.props.loadAds;
  
  render(){
    
    
    const {isFetching, err } = this.props;
    return(
      <div>
      <ErrorBoundary>
        <Provider store={this.props.store}>
          
				<SnackbarProvider 
    iconVariant={{ success: '✅', error: '✖️', warning: '⚠️', info: 'ℹ️', }}
    anchorOrigin={{ vertical: 'top', horizontal: 'center',}}>

        <Router>
          <Switch>
              <Route exact path="/" component={List} />
              <Route exact path="/advert" component={List} />
              <Route exact path="/advert/:adId/:name" component={DetailAd} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/editad/:adId" component={EditAd} />
              <Route exact path="/newad" component={NewAd} />
              <Route component={List}/>
          </Switch>
        </Router>
        </SnackbarProvider>       
        </Provider>
			</ErrorBoundary>
      {isFetching && <ReactSpinner type="grow" color="info" size="60" />}
      {err && <Alert key="alert" variant="info"> {err}}</Alert>}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch)  {
  return{
    loadAds: () => dispatch(fetchAds()),
    
  }
}


function mapStateToProps(state)  {
  return{
      user: state.user,
      ads: state.ads,
      isFetching: state.ui.isFetching,
      err: state.ui.err
      
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);