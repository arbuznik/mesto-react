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
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });

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
    setSelectedCard({ name: '', link: '' });
  }

  return (
    <div className='page'>
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
      <Footer />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <PopupWithForm name={'edit'} title={'Редактировать профиль'} buttonText={'Сохранить'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input type="text" className="form__input form__input_type_name" id="user-name-input" name="name" placeholder="Имя" minLength="2" maxLength="40" required />
        <span className="form__input-error user-name-input-error"/>
        <input type="text" className="form__input form__input_type_about" id="user-job-input" name="about" placeholder="О себе" minLength="2" maxLength="200" required />
        <span className="form__input-error user-job-input-error"/>
      </PopupWithForm>

      <PopupWithForm name={'add'} title={'Новое место'} buttonText={'Создать'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input type="text" className="form__input form__input_type_place-name" id="place-name-input" name="name" placeholder="Название" minLength="2" maxLength="30" required />
        <span className="form__input-error place-name-input-error"/>
        <input type="url" className="form__input form__input_type_place-link" id="place-link-input" name="link" placeholder="Ссылка на картинку" required />
        <span className="form__input-error place-link-input-error"/>
      </PopupWithForm>

      <PopupWithForm name={'edit-avatar'} title={'Обновить аватар'} buttonText={'Создать'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input type="text" className="form__input form__input_type_place-name" id="place-name-input" name="name" placeholder="Название" minLength="2" maxLength="30" required />
        <span className="form__input-error place-name-input-error"/>
        <input type="url" className="form__input form__input_type_place-link" id="place-link-input" name="link" placeholder="Ссылка на картинку" required />
        <span className="form__input-error place-link-input-error"/>
      </PopupWithForm>

      <PopupWithForm name={'delete'} title={'Вы уверены?'} buttonText={'Да'} isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} />
      </div>
  );
}

export default App;