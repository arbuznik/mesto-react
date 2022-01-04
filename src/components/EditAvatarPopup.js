import PopupWithForm from "./PopupWithForm";
import {useRef, useState} from "react";

export function EditAvatarPopup(props) {
  const inputRef = useRef();
  const [avatarLink, setAvatarLink] = useState('');

  function handleFormSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({avatar: avatarLink});
  }

  function handleInputChange() {
    setAvatarLink(inputRef.current.value);
  }

  return (
    <PopupWithForm name={"edit-avatar"} title={"Обновить аватар"} buttonText={props.isLoading ? 'Сохраняется...' : 'Сохранить'}
                   isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleFormSubmit} onOverlayClick={props.onOverlayClick}>
      <input ref={inputRef} type="url" className="form__input form__input_type_link" id="user-avatar-input" name="avatar"
             placeholder="Ссылка на аватар" required onChange={handleInputChange}/>
      <span className="form__input-error user-avatar-input-error"/>
    </PopupWithForm>
  )
}