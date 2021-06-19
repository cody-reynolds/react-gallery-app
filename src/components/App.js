//Imports all the necessary React libraries.
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
      dogPhotos: [],
      catPhotos: [],
      birdPhotos: [],
      customPhotos: [],
    }
    this.getCustomPhotos = this.getCustomPhotos.bind(this);
  }

  //Handles API fetching for Nav keywords once App mounts to the DOM.
  componentDidMount(){
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
    .then(response => 
      this.setState({
        dogPhotos: response.data.photos.photo,
      }))
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })

      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
    .then(response => 
      this.setState({
        catPhotos: response.data.photos.photo,
      }))
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })

      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=birds&per_page=24&format=json&nojsoncallback=1`)
    .then(response => 
      this.setState({
        birdPhotos: response.data.photos.photo,
      }))
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })
  }

  //This function handles the API call when the user searches for their own custom photos.
  getCustomPhotos = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => 
      this.setState({
        customPhotos: response.data.photos.photo,
      }))
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Search getPhotos={this.getCustomPhotos} history={this.props.history}/>
          <Nav/>
          <Switch>
            <Route exact path='/' render={() => <PhotoContainer photos={this.state.dogPhotos}/>}/>
            <Route exact path='/dogs' render={() => <PhotoContainer photos={this.state.dogPhotos}/>}/>
            <Route exact path='/cats' render={() => <PhotoContainer photos={this.state.catPhotos}/>}/>
            <Route exact path='/birds' render={() => <PhotoContainer photos={this.state.birdPhotos}/>}/>
            <Route exact path='/search/:query' render={() => <PhotoContainer photos={this.state.customPhotos}/>}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;