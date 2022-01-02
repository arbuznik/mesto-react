import PopupWithForm from "./PopupWithForm";
import {useState} from "react";

export function AddPlacePopup(props) {
  const [place, setPlace] = useState({});

  function handleFormSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace(place);
  }

  function handleInputChange(evt) {
    setPlace({...place, [evt.target.name]: evt.target.value});
  }

  return (
    <PopupWithForm name={"add"} title={"Новое место"} buttonText={"Создать"} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleFormSubmit} onChange={handleInputChange}>
      <input type="text" className="form__input form__input_type_place-name" id="place-name-input" name="name" placeholder="Название" minLength="2" maxLength="30" onChange={handleInputChange} required/>
      <span className="form__input-error place-name-input-error"/>
      <input type="url" className="form__input form__input_type_place-link" id="place-link-input" name="link" placeholder="Ссылка на картинку" onChange={handleInputChange} required/>
      <span className="form__input-error place-link-input-error"/>
    </PopupWithForm>
  )
}