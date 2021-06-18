import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';



const PhotoContainer = (props) => {

      let photos;
      if(props.photos.length > 0){
        photos = props.photos.map(photo => (
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

export default PhotoContainer;