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
    isloadMore: false,
    per_page: 12,
    page: 1,
    visible: false,
  };

  async componentDidMount() {
    this.setState({ visible: true });
    if (!this.state.pictures.length) {
      try {
        const resp = await pixabayAPI({});
        if (resp.totalHits > 12) this.setState({ isloadMore: true });

        this.setState({ pictures: resp.hits });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ visible: false });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    const { searchQwery } = this.props;
    const { per_page, page } = this.state;

    if (page !== prevState.page || searchQwery !== prevProps.searchQwery) {
      if (searchQwery !== prevProps.searchQwery) {
        this.setState({ pictures: [], page: 1 });
        try {
          const resp = await pixabayAPI({
            q: searchQwery,
            page,
          });
          (resp.hits.length === per_page) & (resp.totalHits > per_page)
            ? this.setState({ isloadMore: true })
            : this.setState({ isloadMore: false });
          this.setState({ pictures: resp.hits });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const resp = await pixabayAPI({ page, q: searchQwery });
          console.log(resp.hits.length);
          (resp.hits.length === per_page) & (resp.totalHits > per_page)
            ? this.setState({ isloadMore: true })
            : this.setState({ isloadMore: false });

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
        {this.state.isloadMore && <LoadMore onClick={this.loadMore} />}
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
