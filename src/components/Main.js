import React, {useContext, useEffect, useState} from 'react';
import api from '../utils/api.js';
import Card from './Card.js';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {

  const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    api.getInitialCards()
      .then(cards => setCards(cards))
      .catch(api.handleApiError);
  }, [])

  function handleLikeClick(card) {
    const isLikedByOwner = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLikedByOwner)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c))
      })
      .catch(api.handleApiError)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(_ => {
        setCards(state => state.filter(c => c._id !== card._id))
      })
      .catch(api.handleApiError)
  }

  return (
    <main className="main page__main">
      <section className="profile page__profile">
        <div className="profile__avatar-overlay" onClick={props.onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватарка" className="profile__avatar" />
        </div>
        <div className="profile__content-wrapper">
          <div className="profile__title-wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile} aria-label="Редактировать профиль" title="Редактировать профиль"/>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace} aria-label="Добавить карточку" title="Добавить карточку"/>
      </section>

      <section className="places page__places">
        {cards.map(card => {
          return <Card key={card._id}  card={card} onCardClick={props.onCardClick} onLikeClick={handleLikeClick} onDeleteClick={handleCardDelete}/>
        })}
      </section>
    </main>
  )
}

export default Main;