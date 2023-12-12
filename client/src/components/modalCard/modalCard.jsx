import React from 'react'

// Styles
import styles from './modalCard.module.css';

// Hooks
import {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// MUI Component
import CloseIcon from '@mui/icons-material/Close';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

/** This is a simple example of how the component works **/
export const Example = () => {

  return (
    <Modal
      btnText="Open Modal"
      title=""
      size="medium"
      icon={<FontAwesomeIcon icon={faXmarkCircle} />}
    >
      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
    </Modal>
  )
}

export const Modal = ({
    title,
    icon,
    hasBtn = true,
    btnText,
    children,
    className,
    size = 'dialog',
    isOpen,
    id,
    }) => {

    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    },[isOpen]);

    const addedClasses =
        `${className ? ` ${className}` : ''}` +
        `${size ? ` cc-modal-${size}` : ''}`;

    const modalId = "modal";

    const modalComponent = open && (
        ReactDOM.createPortal(
        <div className={styles[`cc-modal-container${addedClasses}`]} id={styles["modal"]}>

            <button
            className={styles["cc-modal-overlay"]}
            onClick={() => setOpen(!open)}
            aria-label="Close Modal"
            />
            <div className={styles["cc-modal"]}>

            {size !== 'dialog' 
            ? 
            <div className={styles["cc-modal-header"]}>
                <h3 className={styles["cc-modal-title"]}>{title}</h3>
                <button
                    className={styles["cc-modal-close"]}
                    onClick={() => setOpen(!open)}
                    aria-label="Close Modal"
                >
                <CloseIcon></CloseIcon>
                </button>
            </div>
            : 
            <button className={styles["cc-modal-fixed-close"]} onClick={() => setOpen(!open)}>
              <CloseIcon></CloseIcon>
            </button>
            }
          
            <div className={styles["cc-modal-body"]}>
                {children}
            </div>

        </div>

        </div>, document.body
        )
    );

  return (
  <>
    {hasBtn &&
      <button
        className={styles["cc-open-modal"]}
        onClick={() => setOpen(!open)}
        aria-haspopup="dialog"
        aria-controls={modalId}
      >
        {
          btnText === "" ? icon : btnText
        }
      </button>
    }
    {modalComponent}
  </>
)};

Modal.propTypes = {
  title: PropTypes.string,
  hasBtn: PropTypes.bool,
  btnText: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['dialog', 'small', 'medium', 'large', 'full']),
  isOpen: PropTypes.bool,
  id: PropTypes.string,
}