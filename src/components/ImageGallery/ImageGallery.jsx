import React, { Component } from 'react';
import pixabayAPI from 'components/Sevice_Api/Pixabay_API';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  state = {
    pictures: [],
  };

  async componentDidMount() {
    try {
      const resp = await pixabayAPI();
      this.setState(
        pervState =>
          (this.state.pictures = [...pervState.pictures, ...resp.hits])
      );
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <ul className="gallery">
        {this.state.pictures.map(({ id, webformatURL }) => (
          <ImageGalleryItem key={id} id={id} webformatURL={webformatURL} />
        ))}
      </ul>
    );
  }
}
