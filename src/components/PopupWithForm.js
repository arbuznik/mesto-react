import React from "react";

function PopupWithForm(props) {
  return (
      <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-button" onClick={props.onClose} aria-label="Закрыть окно" title="Закрыть окно"></button>
          <form action="#" className="form popup__form form_profile" name={props.name} noValidate>
            <h3 className="form__title popup__title">{props.title}</h3>
            {props.children}
          </form>
        </div>
      </div>
  )
}

export default PopupWithForm;