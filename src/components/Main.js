import React, { useEffect, useState } from 'react';
import api from '../utils/api.js';

function Main(props) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  useEffect(() => {
    api.getUserInfo()
      .then(userData => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch(api.handleApiError);
  })

  return (
    <main className="main page__main">
      <section className="profile page__profile">
        <div className="profile__avatar-overlay" onClick={props.onEditAvatar}>
          <img src={userAvatar} alt="Аватарка" className="profile__avatar" />
        </div>
        <div className="profile__content-wrapper">
          <div className="profile__title-wrapper">
            <h1 className="profile__title">{userName}</h1>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile} aria-label="Редактировать профиль" title="Редактировать профиль"></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace} aria-label="Добавить карточку" title="Добавить карточку"></button>
      </section>

      <section className="places page__places">

      </section>
    </main>
  )
}

export default Main;