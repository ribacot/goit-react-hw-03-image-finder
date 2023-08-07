import React, { Component } from 'react';
import pixabayAPI from 'components/Sevice_Api/Pixabay_API';
import { Circles } from 'react-loader-spinner';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import LoadMore from 'components/LoadMore/LoadMore';
import Modal from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    pictures: [],
    largeImage: null,
    modalIsOpen: false,
    total: 0,
    page: 1,
    visible: false,
  };

  async componentDidMount() {
    this.setState({ visible: true });
    if (!this.state.pictures.length) {
      try {
        const resp = await pixabayAPI({});

        this.setState({ pictures: resp.hits, total: resp.total });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ visible: false });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    const { searchQwery } = this.props;
    const { page } = this.state;

    if (page !== prevState.page || searchQwery !== prevProps.searchQwery) {
      if (searchQwery !== prevProps.searchQwery) {
        this.setState({ pictures: [], page: 1, total: 0 });
        try {
          const resp = await pixabayAPI({
            q: searchQwery,
            page,
          });

          this.setState({ pictures: resp.hits, total: resp.total });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const resp = await pixabayAPI({ page, q: searchQwery });

          this.setState(prevState => {
            return {
              pictures: [...prevState.pictures, ...resp.hits],
              total: resp.total,
            };
          });
          console.log(resp);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  toggleModal = () => {
    this.setState(prevState => ({ modalIsOpen: !prevState.modalIsOpen }));
  };

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
        <Circles visible={this.state.visible} />
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
        {this.state.total > 12 ? <LoadMore onClick={this.loadMore} /> : null}
        {this.state.modalIsOpen && (
          <Modal onClick={this.toggleModal}>
            <img
              src={this.state.largeImage}
              alt=""
              onClick={this.toggleModal}
            />
          </Modal>
        )}
      </>
    );
  }
}
