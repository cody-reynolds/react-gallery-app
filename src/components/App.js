//Imports all the necessary React libraries.
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

//Imports axios to perform the API call
import axios from 'axios';

//Imports the API key from the config file
import apiKey from './config';

//Imports the various application components
import Search from './Search';
import Nav from './Nav';
import PhotoContainer from './PhotoContainer';
import NotFound from './NotFound';

class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true
    }
    this.getPhotos = this.getPhotos.bind(this);
  }

  getPhotos = (query = 'dogs') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => 
      this.setState({
        photos: response.data.photos.photo,
        loading: false
      }))
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Search getPhotos={this.getPhotos}/>
          <Nav/>
          <Switch>
            <Route exact path='/' render={ () => <Redirect to='/dogs'/>}/>            
            <Route exact path="/:query" render={() => <PhotoContainer photos={this.state.photos} getPhotos={this.getPhotos}/>}/>
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;