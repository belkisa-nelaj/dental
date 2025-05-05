document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
      
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if(filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Lightbox Functionality
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    
    let currentImageIndex = 0;
    const lightboxImages = [];
    
    // Collect all lightbox images data
    lightboxTriggers.forEach((trigger, index) => {
        lightboxImages.push({
            src: trigger.getAttribute('href'),
            title: trigger.getAttribute('title'),
            description: trigger.closest('.overlay-content').querySelector('p').textContent
        });
        
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            currentImageIndex = index;
            openLightbox(currentImageIndex);
        });
    });
    
    function openLightbox(index) {
        lightboxImage.src = lightboxImages[index].src;
        lightboxTitle.textContent = lightboxImages[index].title;
        lightboxDescription.textContent = lightboxImages[index].description;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if(e.target === lightbox) {
            closeLightbox();
        }
    });
    
    lightboxPrev.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
        openLightbox(currentImageIndex);
    });
    
    lightboxNext.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
        openLightbox(currentImageIndex);
    });
    

    document.addEventListener('keydown', function(e) {
        if(!lightbox.classList.contains('active')) return;
        
        if(e.key === 'Escape') {
            closeLightbox();
        } else if(e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
            openLightbox(currentImageIndex);
        } else if(e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
            openLightbox(currentImageIndex);
        }
    });
});