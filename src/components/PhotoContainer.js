import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

//Imports axios to perform the API call
import axios from 'axios';

//Imports the API key from the config file
import apiKey from './config';

class PhotoContainer extends React.Component {
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

    //Triggers search for the default query string once App component mounts into the DOM.
  componentDidMount() {
    this.getPhotos(this.props.searchTerm);
  }

    render() {
      let photos;
      if(this.state.photos.length > 0){
        photos = this.state.photos.map(photo => (
          <Photo url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`} 
          key={photo.id} />
        ))
      } else {
        photos = <NotFound />
      }
      return(
        <div class="photo-container">
        <h2>Results</h2>
        <ul>
          {photos}
        </ul>
        </div>
      )
    }
}

export default PhotoContainer;