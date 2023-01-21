import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './fetch';
import { createCards } from './cards';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

let query = '';
let totalHits = 0;
let page = 1;
const perPage = 20;

searchForm.addEventListener('submit', onSubmit);
loadMoreButton.addEventListener('click', onClick);

function onSubmit(evt) {
  evt.preventDefault();
  page = 1;
  query = evt.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  loadMoreButton.classList.add('is-hidden');
  if (query === '') {
    noInfo();
    return;
  }

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        noContent();
      } else {
        createCards(data.hits);
        const lightbox = new SimpleLightbox('.gallery a').refresh();
        addTotalInfo(data);

        if (data.totalHits > perPage) {
          loadMoreButton.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error));
}

function onClick() {
  page += 1;
  fetchImages(query, page, perPage)
    .then(({ data }) => {
      createCards(data.hits);
      const lightbox = new SimpleLightbox('.gallery a').refresh();

      const totalPages = Math.ceil(data.totalHits / perPage);

      if (page === totalPages) {
        loadMoreButton.classList.add('is-hidden');
        endContent();
      }
    })
    .catch(error => console.log(error));
}

function addTotalInfo(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function noInfo() {
  Notiflix.Notify.failure('Oops.');
}

function endContent() {
  Notiflix.Notify.warning(
    "We're sorry, but you've reached the end of search results."
  );
}

function noContent() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
