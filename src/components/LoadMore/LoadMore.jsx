import css from './LoadMore.module.css';
export default function LoadMore({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={css.Button}>
      Load more
    </button>
  );
}
