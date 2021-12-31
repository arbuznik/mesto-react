import React from "react";

function Card(props) {
  return (
    <article className="place">
      <img className="place__cover" src={props.link} alt={props.name} onClick={() => props.onCardClick(props)} />
      <button type="button" className="place__delete-button" aria-label="Удалить" title="Удалить"/>
      <div className="place__content">
        <h2 className="place__title">{props.name}</h2>
        <button type="button" className="place__like-button" aria-label="Лайк" title="Лайк"/>
        <p className="place__like-counter">{props.likes}</p>
      </div>
    </article>
  )
}

export default Card;