function ImagePopup() {
  return (
    <div className="popup popup_photo">
      <div className="popup__container">
        <button type="button" className="popup__close-button" aria-label="Закрыть окно" title="Закрыть окно"></button>
        <figure className="popup__photo-container">
          <img src="<%=require('./images/place-image-canada.jpg')%>" className="popup__photo" />
          <figcaption className="popup__photo-caption"></figcaption>
        </figure>
      </div>
    </div>
  )
}