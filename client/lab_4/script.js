/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-const-assign */
let slidePosition = 0;
const slides = document.getElementsByClassName('carousel_item');
const totalSlides = slides.length;
document
  .getElementById('carousel_button--next')
  .addEventListener('click', () => {
    moveToNextSlide();
  });

document
  .getElementById('carousel_button--prev')
  .addEventListener('click', () => {
    moveToPrevSlide();
  });

function updateSlidePosition() {
  for (let slide of slides) {
    slide.classList.remove('carousel_item--visible');
    slide.classList.add('carousel_item--hidden');
  }
  slides[slidePosition].classList.add('carousel_item--visible');
}
function moveToNextSlide() {
  if (slidePosition === totalSlides) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  updateSlidePosition();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = 0;
  } else {
    slidePosition--;
  }
  updateSlidePosition();
}
