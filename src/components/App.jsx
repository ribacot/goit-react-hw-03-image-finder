import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
// import pixabayAPI from './Sevice_Api/Pixabay_API';

import Searchbar from './Searchbar/Searchbar';
export class App extends Component {
  // state = {
  //   searchQwery: '',
  // };
  // hendlSearch = e => {
  //   const { value } = e.target;
  //   this.setState({ searchQwery: value });
  //   console.log(this.state.searchQwery);
  // };
  // onSubmit = e => {
  //   console.log(e);
    // e.preventDefault();
    // const { searchQwery } = this.state;
    // pixabayAPI({ q: searchQwery, });
    // console.log(searchQwery)
    // return searchQwery
  // };

  render() {
    return (
      <div className="App">
        <Searchbar
        // value={this.state.searchQwery}
        // onSubmit={this.onSubmit}
        // onChenge={this.hendlSearch}
        />
        <ImageGallery />
      </div>
    );
  }
}
// value={this.onSubmit()}
