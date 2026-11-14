import getImagesByQuery from './js/pixabay-api.js';
import renderFunctions from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMore = document.querySelector('.load-more');

let requestText = '';
let page = 1;

async function loadImages(thisLoadMore = false) {
  renderFunctions.showLoader();
  renderFunctions.hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(requestText, page);
    const images = data.hits;

    if (images.length === 0) {
      if (!thisLoadMore) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }

      return false;
    }

    renderFunctions.createGallery(images);

    if (page * 15 < data.totalHits) {
      renderFunctions.showLoadMoreButton();
    } else {
      renderFunctions.hideLoadMoreButton();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    return true;
  } catch (error) {
    console.log(error);

    if (thisLoadMore) {
      page--;
    }

    iziToast.error({
      message: 'Something went wrong. Please try again!',
      position: 'topRight',
    });

    return false;
  } finally {
    renderFunctions.hideLoader();
  }
}

function scrollAfterLoadMore() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

form.addEventListener('submit', async event => {
  event.preventDefault();

  requestText = form.elements.input.value.trim();
  page = 1;

  if (requestText === '') {
    return;
  }

  renderFunctions.clearGallery();

  await loadImages();
});

loadMore.addEventListener('click', async () => {
  page++;

  const success = await loadImages(true);

  if (success) {
    scrollAfterLoadMore();
  }
});
