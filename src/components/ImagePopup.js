function ImagePopup(props) {
  return (
    <div className={`popup popup_photo ${props.card.link && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={props.onClose} aria-label="Закрыть окно" title="Закрыть окно"></button>
        <figure className="popup__photo-container">
          <img src={`${props.card.link}`} alt={`${props.card.name}`} className="popup__photo" />
          <figcaption className="popup__photo-caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;