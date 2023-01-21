export { createCards };
const gallery = document.querySelector('.gallery');
function createCards(images) {
  const cards = images
    .map(img => {
      const {
        id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = img;
      return `<a class="gallery-link" href=${largeImageURL}>
      <div class="photo-card" id=${id}>
        <img src=${webformatURL} alt=${tags} loading="lazy"/>
        <div class="info">
          <p class="info__item"> <b>Likes</b> ${likes} </p>
          <p class="info__item"> <b>Views</b> ${views} </p>
          <p class="info__item"> <b>Comments</b> ${comments} </p>
          <p class="info__item"> <b>Downloads</b> ${downloads} </p>
        </div>
      </div>
      </a>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', cards);
}
