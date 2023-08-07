import React, { Component } from 'react';
import pixabayAPI from 'components/Sevice_Api/Pixabay_API';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Modal from 'components/Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    pictures: [],
    largeImage: null,
    modalIsOpen: false,
  };

  async componentDidMount() {
    if(!this.state.pictures.length){
      try {
        const resp = await pixabayAPI({});
        console.log(resp.hits);

        this.setState({ pictures: [...resp.hits] });
      } catch (error) {
        console.log(error);
      }
    }

}


  hendleImage = async e => {
    const { id } = e.target;

    try {
      console.log(id);
      const resp = await pixabayAPI({ id });
      const largeImage = resp.hits[0].largeImageURL;
      this.setState({ largeImage, modalIsOpen: true });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log('render');

    return (
      <>
        <ul className={css.ImageGallery}>
          {this.state.pictures.map(({ id, webformatURL }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              webformatURL={webformatURL}
              onClick={this.hendleImage}
            />
          ))}
        </ul>
        {this.state.modalIsOpen && <Modal largeImage={this.state.largeImage} />}
      </>
    );
  }
}
