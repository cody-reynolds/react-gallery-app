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

class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      searchTerm: '',
      loading: true
    }
    this.getPhotos = this.getPhotos.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
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

  updateSearchTerm = (query) => {
    console.log(query);
    this.setState({searchTerm: query})
  }

    //Triggers search for the default query string once App component mounts into the DOM.
  componentDidMount() {
    this.getPhotos();
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Search getPhotos={this.getPhotos}/>
          <Nav />
          <Switch>
            <Route path='/dogs' render={() => <PhotoContainer searchTerm={'dogs'} />}></Route>
            <Route path='/cats' render={() => <PhotoContainer searchTerm={'cats'} />}></Route>
            <Route path='/birds' render={() => <PhotoContainer searchTerm={'birds'} />}></Route>
          </Switch>
          <PhotoContainer photos={this.state.photos}/>
        </div>
      </Router>
    );
  }
}
export default App;