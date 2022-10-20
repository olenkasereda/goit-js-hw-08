// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryImages = document.querySelector('.gallery');
const imagesMarkup = createGalleryItemsMarkup(galleryItems);

function createGalleryItemsMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
        <a href="${original}">
        <img src="${preview}" alt="${description}" title=""/>
        </a>      `;
    })
    .join('');
}

galleryImages.innerHTML = imagesMarkup; // главное создать разметку, а только потом подключать либо

let lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);
