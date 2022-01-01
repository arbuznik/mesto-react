import React, {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwnCard = props.card.owner._id === currentUser._id;
  const deleteButtonClassName = (
    `place__delete-button ${isOwnCard ? 'place__delete-button_visible' : 'place__delete-button_hidden'}`
  )

  const isLikedByOwner = props.card.likes.some(like => like._id === currentUser._id);
  const placeLikeButtonClassName = (
    `place__like-button ${isLikedByOwner && 'place__like-button_active'}`
  )

  return (
    <article className="place">
      <img className="place__cover" src={props.card.link} alt={props.card.name} onClick={() => props.onCardClick(props.card)} />
      <button type="button" className={deleteButtonClassName} aria-label="Удалить" title="Удалить"/>
      <div className="place__content">
        <h2 className="place__title">{props.card.name}</h2>
        <button type="button" className={placeLikeButtonClassName} onClick={() => props.onLikeClick(props.card)} aria-label="Лайк" title="Лайк"/>
        <p className="place__like-counter">{props.card.likes.length}</p>
      </div>
    </article>
  )
}

export default Card;