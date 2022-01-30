import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default class ModalForm extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleEscClick);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEscClick);
  }
  handleEscClick = (evt) => {
    if (evt.code === "Escape") {
      this.props.onClose();
    }
  };
  handleBackdropClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

ModalForm.propTypes = {
  onClose: PropTypes.func,
};
