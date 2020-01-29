import React from 'react';
import Register from "./components/Register/Register";
import List from "./components/advert/List"
import DetailAd from "./components/advert/DetailAd"
import Editnew from "./components/advert/Editnew"
import ErrorBoundary from "./components/advert/ErrorBundary"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux';
import { connect } from 'react-redux';
// import api from './utils/api'
import {Alert} from 'react-bootstrap';
import ReactSpinner from 'react-bootstrap-spinner'
import {fetchAds} from './store/actions'


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
				{/* <UserProvider value={this.state}> */}
        <Router>
          <Switch>
              <Route exact path="/" component={Register} />
              <Route exact path="/advert" component={List} />
              <Route exact path="/advert/:adId" component={DetailAd} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/editnew/:adId" component={Editnew} />
              <Route exact path="/editnew" component={Editnew} />
              <Route component={List}/>
          </Switch>
        </Router>
        {/* </UserProvider>   */}
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