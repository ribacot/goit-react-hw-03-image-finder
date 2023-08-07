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

    if (searchQwery !== prevProps.searchQwery) {
      this.setState({ page: 1 ,pictures:[]});
      try {
        const resp = await pixabayAPI({
          q: searchQwery,
          page,
        });

        this.setState({ pictures: resp.hits });
      } catch (error) {
        console.log(error);
      }
    }

    if (page !== prevState.page) {
      if (searchQwery !== prevProps.searchQwery) {
        this.setState({pictures:[], page: 1 });
        try {
          const resp = await pixabayAPI({
            q: searchQwery,
            page,
          });

          this.setState({ pictures: resp.hits });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const resp = await pixabayAPI({ page, q: searchQwery });

          this.setState(prevState => {
            return { pictures: [...prevState.pictures, ...resp.hits] };
          });
          console.log(resp);
        } catch (error) {
          console.log(error);
        }
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
