import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';

import Searchbar from './Searchbar/Searchbar';
export class App extends Component {
  state = {
    searchQwery: '',
    value:'',
  };
  hendlSearch = e => {
    const { value } = e.target;
    this.setState({ searchQwery: value });
  };
  onSubmit = async e => {
    e.preventDefault();
    const value = e.target.elements.searchQwery.value;
    this.setState({
      value,
    searchQwery:""})
  };

  render() {
    return (
      <div className="App">
        <Searchbar
          value={this.state.searchQwery}
          onSubmit={this.onSubmit}
          onChenge={this.hendlSearch}
        />
        <ImageGallery searchQwery={this.state.value } />
      </div>
    );
  }
}
