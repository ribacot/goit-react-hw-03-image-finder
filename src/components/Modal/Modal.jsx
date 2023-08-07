import css from './Modal.module.css'

export default function Modal({largeImage}) {
    return (
      <div className={css.overlay}>
        <div className={css.modal}>
          <img src={largeImage} alt="" />
        </div>
      </div>
    );
}