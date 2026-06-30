const ROTATE_INTERVAL_MS = 8000;

const photoEl = document.getElementById("photo");
const quoteBox = document.getElementById("quote-box");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");

let photoIndex = -1;
let quoteIndex = -1;

function nextIndex(current, length) {
  if (length <= 1) return 0;
  let next;
  do {
    next = Math.floor(Math.random() * length);
  } while (next === current);
  return next;
}

function showNext() {
  photoEl.classList.remove("visible");
  quoteBox.classList.remove("visible");

  setTimeout(() => {
    photoIndex = nextIndex(photoIndex, PHOTOS.length);
    quoteIndex = nextIndex(quoteIndex, QUOTES.length);

    photoEl.src = PHOTOS[photoIndex];
    quoteText.textContent = QUOTES[quoteIndex].text;
    quoteAuthor.textContent = QUOTES[quoteIndex].author;

    photoEl.onload = () => photoEl.classList.add("visible");
    quoteBox.classList.add("visible");
  }, 600);
}

showNext();
setInterval(showNext, ROTATE_INTERVAL_MS);
