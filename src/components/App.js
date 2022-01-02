import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserInfo()
      .then(user => setCurrentUser(user))
      .catch(api.handleApiError)
  }, [])
console.log(currentUser)
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

  function handleUpdateUser(userInfo) {
    api.editUserInfo(userInfo)
      .then(updatedUserInfo => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch(api.handleApiError)
  }

  function handleUpdateAvatar(avatar) {
    api.editUserAvatar(avatar)
      .then(updatedUserInfo => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch(api.handleApiError)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header/>
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
        <Footer/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <PopupWithForm name={'add'} title={'Новое место'} buttonText={'Создать'} isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}>
          <input type="text" className="form__input form__input_type_place-name" id="place-name-input" name="name"
                 placeholder="Название" minLength="2" maxLength="30" required/>
          <span className="form__input-error place-name-input-error"/>
          <input type="url" className="form__input form__input_type_place-link" id="place-link-input" name="link"
                 placeholder="Ссылка на картинку" required/>
          <span className="form__input-error place-link-input-error"/>
        </PopupWithForm>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <PopupWithForm name={'delete'} title={'Вы уверены?'} buttonText={'Да'} isOpen={isDeleteCardPopupOpen}
                       onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;