//Imports all the necessary React libraries.
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

//Imports axios to perform the API call
import axios from 'axios';

//Imports the API key from the config file
import apiKey from './config';

//Imports the various application components
import Search from './Search';
import Nav from './Nav';
import PhotoContainer from './PhotoContainer';

class App extends Component {

  state = {
    photos: [],
    loading: true
  }

  //Triggers search for the default query string once App component mounts into the DOM.
  componentDidMount() {
    this.performSearch();
  }

  //Handles search function, with 'sunset' as the default query.
  performSearch = (query = 'sunsets') => {
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
      <div className="container">
      <Search />
      {/* <Nav /> */}
      <PhotoContainer data={this.state.photos}/>
      </div>
    );
  }

}
export default App;