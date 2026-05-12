import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import PropTypes from 'prop-types';
import './style.css';

Modal.propTypes = {
  classNameModal: PropTypes.any,
  label: PropTypes.any,
  id: PropTypes.any,
  anchorButton: PropTypes.bool,
};

function Modal(props) {
  const { label, classNameModal, id, anchorButton } = props;
  const [state, setState] = useState({});
  const anchor = 'right';

  const toggleDrawer = (placement, action) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if (event?.preventDefault) {
      event.preventDefault();
    }
    setState({ ...state, [placement]: action });
  };

  const list = (placement) => (
    <div className="web-modal" role="presentation">
      <div className="web-modal__dialog ui-dialog ui-wrap">
        <div className="web-modal__header ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle">
          <button type="button" className="web-modal__close btn-close" title="Close" onClick={toggleDrawer(placement, false)}>
            <span>
              <i className="icon_Close"></i>
            </span>
          </button>
        </div>
        <div className="web-modal__content dialog-content ui-dialog-content ui-widget-content child-content">{props.children}</div>
      </div>
    </div>
  );

  return (
    <>
      {anchorButton ? (
        <a href="/#" className={classNameModal} id={id} onClick={toggleDrawer(anchor, true)}>
          {label}
        </a>
      ) : (
        <button type="button" className={classNameModal} id={id} onClick={toggleDrawer(anchor, true)}>
          {label}
        </button>
      )}

      <SwipeableDrawer anchor={anchor} open={!!state[anchor]} onClose={toggleDrawer(anchor, false)} onOpen={toggleDrawer(anchor, true)}>
        {list(anchor)}
      </SwipeableDrawer>
    </>
  );
}

export default Modal;
