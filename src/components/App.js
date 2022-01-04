import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import {useEffect, useState} from 'react';
import ImagePopup from './ImagePopup.js';
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";
import {DeleteConfirmationPopup} from "./DeleteConfirmationPopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then(user => setCurrentUser(user))
      .catch(api.handleApiError);

    api.getInitialCards()
      .then(cards => setCards(cards))
      .catch(api.handleApiError);

    function handleEscPress(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    }
  }, [])

  function handleLikeClick(card) {
    const isLikedByOwner = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLikedByOwner)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c))
      })
      .catch(api.handleApiError)
  }

  function handleCardDelete() {
    api.deleteCard(selectedCard._id)
      .then(_ => {
        setCards(state => state.filter(c => c._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch(api.handleApiError)
  }

  function handleCardDeleteClick(card) {
    setDeleteCardPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
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
    setImagePopupOpen(false);
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

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(api.handleApiError);
  }

  function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header/>
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards}
              onLikeClick={handleLikeClick} onDeleteClick={handleCardDeleteClick}/>
        <Footer/>
        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} onOverlayClick={handleOverlayClick}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} onOverlayClick={handleOverlayClick}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} onOverlayClick={handleOverlayClick}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} onOverlayClick={handleOverlayClick}/>
        <DeleteConfirmationPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onOverlayClick={handleOverlayClick} onDeleteClick={handleCardDelete}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

// TODO: form validation
// TODO: loading state for popup buttons