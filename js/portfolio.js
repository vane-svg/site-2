const filterButtons = [...document.querySelectorAll('.portfolio-filter')];
const projectCards = [...document.querySelectorAll('.portfolio-card')];
const projectCount = document.getElementById('portfolio-count');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    let visibleCount = 0;
    projectCards.forEach(card => {
      const visible = button.dataset.filter === 'all' || card.dataset.category.split(/\s+/).includes(button.dataset.filter);
      card.hidden = !visible;
      if (!visible) card.querySelector('video')?.pause();
      if (visible) visibleCount += 1;
    });
    projectCount.textContent = `${visibleCount} proyectos · ${button.textContent}`;
  });
});

const lightbox = document.getElementById('project-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxPosition = document.getElementById('lightbox-position');
const lightboxStatus = document.getElementById('lightbox-status');
const previousButton = document.getElementById('lightbox-previous');
const nextButton = document.getElementById('lightbox-next');
let galleryImages = [];
let galleryIndex = 0;
let activeCard;
let originalOverflow = '';
let returnFocus;

function showGalleryImage(index) {
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  const image = galleryImages[galleryIndex];
  lightboxStatus.textContent = 'Cargando fotografía…';
  lightboxStatus.hidden = false;
  lightboxImage.hidden = true;
  lightboxImage.alt = image.alt;
  lightboxImage.src = image.src;
  lightboxCaption.textContent = `${activeCard.querySelector('h3').textContent} — ${image.alt}`;
  lightboxPosition.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
  previousButton.disabled = galleryImages.length < 2;
  nextButton.disabled = galleryImages.length < 2;
}

lightboxImage.addEventListener('load', () => {
  lightboxImage.hidden = false;
  lightboxStatus.hidden = true;
});

lightboxImage.addEventListener('error', () => {
  lightboxImage.hidden = true;
  lightboxStatus.textContent = 'No se pudo cargar la fotografía. Puede consultar las otras imágenes del proyecto.';
  lightboxStatus.hidden = false;
});

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    if (card.dataset.video) return;
    activeCard = card;
    returnFocus = card.querySelector('.portfolio-photo');
    galleryImages = JSON.parse(card.dataset.images);
    originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lightbox.showModal();
    showGalleryImage(0);
  });
});

document.getElementById('lightbox-close').addEventListener('click', () => lightbox.close());
previousButton.addEventListener('click', () => showGalleryImage(galleryIndex - 1));
nextButton.addEventListener('click', () => showGalleryImage(galleryIndex + 1));
lightbox.addEventListener('click', event => {
  if (event.target === lightbox || event.target.classList.contains('lightbox-stage')) lightbox.close();
});
lightbox.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showGalleryImage(galleryIndex + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
lightbox.addEventListener('close', () => {
  document.body.style.overflow = originalOverflow;
  lightboxImage.removeAttribute('src');
  if (returnFocus) returnFocus.focus();
});
