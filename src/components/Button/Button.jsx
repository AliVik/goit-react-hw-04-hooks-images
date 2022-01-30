import css from "./Button.module.css";
import PropTypes from "prop-types";

export default function Button({ onLoadBtnClick }) {
  return (
    <button type="button" className={css.Button} onClick={onLoadBtnClick}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onLoadBtnClick: PropTypes.func,
};
