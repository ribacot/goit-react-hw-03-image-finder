import css from './ImageGalleryItem.module.css';
export default function ImageGalleryItem({ webformatURL, onClick, id }) {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt=""
        className={css.ImageGalleryItem_image}
        id={id}
        onClick={onClick}
      />
    </li>
  );
}
