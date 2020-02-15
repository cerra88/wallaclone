import React, { Component } from 'react';
import { Card, ButtonToolbar, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../../css/styles.css';
import Moment from 'react-moment';


//import Movie from '../Movies/Movies'


export default class AdsList extends Component {

    constructor(props){
        super(props)
        this.dateFromObjectId = this.dateFromObjectId.bind(this);
    
        this.state = {}
        
      }

dateFromObjectId = (objectId) => {
        return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    };




render() {
    
    console.log(this.props.ads)
    

    return (
    <React.Fragment>
            
                <div className="card-grid">
                {this.props.ads.map(ad => (
                    
                <Card key={ad._id} style={{flex: 1, width: 350}}>
                    <Link to={`/advert/${ad._id}/${ad.name}`} className="card-header-title"> <Card.Img variant="top" fluid='true' src={`http://localhost:3001/${ad.photo}`     } /> </Link>
                    
                    <Card.Body>
                        <Link to={`/advert/${ad._id}`} className="card-header-title"><Card.Title>{ad.name}</Card.Title> </Link>
                        <Card.Text>{ad.description}</Card.Text>
                        <h5><Card.Text>{ad.price}€</Card.Text></h5>
                        {
                            ad.type === "sell" ?(
                            <Button className="adTypeButton button is-primary" variant="info" >Vendo</Button>
                            ):
                            (<Button className="adTypeButton" variant="warning" >Compro</Button>)

                        }
                        
                        
                        {/* <Link to={`/editnew/${ad._id}`}><Card.Text><Button variant="outline-primary">EDIT</Button></Card.Text></Link> */}
                        <ButtonToolbar>
                        {
                            ad.tags.map(tag => (
                            <Button key={tag} className="tagButton" variant="outline-info"  size="sm">{tag}</Button>
                            ))
                            
                        
                        }
                        </ButtonToolbar>
                    </Card.Body>
                    <Card.Footer>
                    {/* <Button className="tagButton" variant="outline-info"  size="sm">{ JSON.stringify(ad.user.username).replace(/['"]+/g, '')}</Button> */}
                        <small>Fecha: <Moment format="DD/MM/YYYY HH:mm">{this.dateFromObjectId(ad._id)}</Moment></small>
                        <br></br>
                    </Card.Footer>
                </Card>
               ))}
                </div>
            
    </React.Fragment>
  );
  }





}