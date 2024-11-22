import classes from "./Modal.module.css"
import { createPortal } from "react-dom"

export default function Modal({closeModal, continueFnc, cancelFnc, type, titulo, buttonValues, children}) {
  return createPortal(
    <>
    <div className={`${classes.modal} ${classes[`modal--${type}`]}`}>
      <div className={`${classes.headerContainer} ${classes.text}`}>
        <h4>{titulo}</h4>
        <a className={`${classes.closeButton}`} onClick={closeModal}>X</a>
      </div>
      <div className={classes.content}>{children}</div>
      <div className={`${classes.buttonContainer} ${classes.text}`}>
        <button className={classes.text} onClick={continueFnc}>{buttonValues.continueVal}</button>
        <button className={classes.text} onClick={cancelFnc}>{buttonValues.cancelVal}</button>
      </div>
    </div>
    <div className={classes.overlay} onClick={closeModal}/>
    </>,
    document.getElementById("root")
  );
};