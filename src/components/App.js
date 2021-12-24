import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import { useState } from 'react';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard('');
  }

  return (
      <div className='page'>
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <PopupWithForm name={'edit'} title={'Редактировать профиль'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <fieldset className="form__input-container">
            <input type="text" className="form__input form__input_type_name" id="user-name-input" name="name" placeholder="Имя" minLength="2" maxLength="40" required />
            <span className="form__input-error user-name-input-error"></span>
            <input type="text" className="form__input form__input_type_about" id="user-job-input" name="about" placeholder="О себе" minLength="2" maxLength="200" required />
            <span className="form__input-error user-job-input-error"></span>
          </fieldset>
          <button type="submit" className="form__save-button popup__save-button" aria-label="Сохранить" title="Сохранить">Сохранить</button>
        </PopupWithForm>

        <PopupWithForm name={'add'} title={'Новое место'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <fieldset className="form__input-container">
            <input type="text" className="form__input form__input_type_place-name" id="place-name-input" name="name" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="form__input-error place-name-input-error"></span>
            <input type="url" className="form__input form__input_type_place-link" id="place-link-input" name="link" placeholder="Ссылка на картинку" required />
            <span className="form__input-error place-link-input-error"></span>
          </fieldset>
          <button type="submit" className="form__save-button popup__save-button" aria-label="Создать" title="Создать">Создать</button>
        </PopupWithForm>

        <PopupWithForm name={'edit-avatar'} title={'Обновить аватар'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <fieldset className="form__input-container">
            <input type="text" className="form__input form__input_type_place-name" id="place-name-input" name="name" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="form__input-error place-name-input-error"></span>
            <input type="url" className="form__input form__input_type_place-link" id="place-link-input" name="link" placeholder="Ссылка на картинку" required />
            <span className="form__input-error place-link-input-error"></span>
          </fieldset>
          <button type="submit" className="form__save-button popup__save-button" aria-label="Создать" title="Создать">Создать</button>
        </PopupWithForm>
        
        <PopupWithForm name={'delete'} title={'Вы уверены?'} isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups}>
          <fieldset className="form__input-container">
            <button type="submit" className="popup__save-button" aria-label="Да" title="Да">Да</button>
          </fieldset>
          <button type="submit" className="form__save-button popup__save-button" aria-label="Создать" title="Создать">Создать</button>
        </PopupWithForm>
      </div>
  );
}

export default App;