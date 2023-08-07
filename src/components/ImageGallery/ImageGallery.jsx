import React, { Component } from 'react';
import pixabayAPI from 'components/Sevice_Api/Pixabay_API';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import LoadMore from 'LoadMore/LoadMore';
import Modal from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    pictures: [],
    largeImage: null,
    modalIsOpen: false,
    page: 1,
  };

  async componentDidMount() {
    if (!this.state.pictures.length) {
      try {
        const resp = await pixabayAPI({});

        this.setState({ pictures: resp.hits });
      } catch (error) {
        console.log(error);
      }
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    const { searchQwery } = this.props;
    const { page } = this.state;

    // if (page !== prevState.page) {
    //   if (searchQwery !== prevProps.searchQwery) {
    //     this.setState({ page: 1 });
    //   }
    //   try {
    //     const resp = await pixabayAPI({ page, q: searchQwery });
    //     this.setState({
    //       pictures: [...prevState.pictures, ...resp.hits],
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    if (searchQwery !== prevProps.searchQwery) {
      try {
        const resp = await pixabayAPI({
          q: searchQwery,
          page: 1,
        });

        this.setState({ pictures: resp.hits, page: 1 });
      } catch (error) {
        console.log(error);
      }
    }
    if (page !== prevState.page) {
      // if (searchQwery !== prevProps.searchQwery) {
      //   this.setState({ page: 1 });
      // }
      try {
        const resp = await pixabayAPI({ page, q: searchQwery });
        if (searchQwery !== prevProps.searchQwery) {
          this.setState({ pictures: resp.hits});
        }

        this.setState({
          pictures: [...prevState.pictures, ...resp.hits],
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  hendleImage = async e => {
    const { id } = e.target;

    try {
      const resp = await pixabayAPI({ id });
      const largeImage = resp.hits[0].largeImageURL;
      this.setState({ largeImage, modalIsOpen: true });
    } catch (error) {
      console.log(error);
    }
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
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
        {this.state.pictures.length ? (
          <LoadMore onClick={this.loadMore} />
        ) : (
          <p>no pictures</p>
        )}
        {this.state.modalIsOpen && <Modal largeImage={this.state.largeImage} />}
      </>
    );
  }
}