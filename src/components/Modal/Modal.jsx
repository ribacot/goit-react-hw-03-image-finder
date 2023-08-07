import { Component } from 'react';
import css from './Modal.module.css';

export default class Modal extends Component {
  state = {};
  componentDidMount() {
    window.addEventListener('keydown', this.hendleModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleModal);
  }

  hendleModal = e => {
    if (e.code === 'Escape') {
      console.log('esc');

      this.props.onClick();
    }
  };
  hendleBackdrop = e => {
    if (e.target === e.curentTarget) this.props.onClick();
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.props.onClick}>
        <div className={css.modal}>{this.props.children}</div>
      </div>
    );
  }
}
