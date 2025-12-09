// Designs Page JavaScript - With Pinterest Card Popup

document.addEventListener('DOMContentLoaded', function() {
    
    // ====================
    // 1. FILTER FUNCTIONALITY
    // ====================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const designCards = document.querySelectorAll('.designs-grid .col-md-6');
    const gridContainer = document.querySelector('.designs-grid');
    
    // Design data for popup - Only 3 projects
    const designData = {
        'kazora-brand': {
            title: 'Kazora Brand Identity',
            subtitle: 'Complete luxury brand identity system',
            category: 'Brand Identity',
            year: '2024',
            description: 'A comprehensive brand identity system for Kazora, a luxury lifestyle brand. This project includes logo design, typography system, color palette, brand guidelines, and application across various touchpoints. The design language balances minimalism with sophistication, creating a timeless and elegant brand presence.',
            images: [
                { src: 'assets/designs/Kazora.jpg', caption: 'Logo' },
                { src: 'assets/designs/Kazora2.jpeg', caption: 'A more stylish logo' },
            ],
            tools: ['Logo Design', 'Brand Strategy', 'Typography', 'Color Theory', 'Packaging Design'],
            timeframe: '4-6 weeks',
            instagramLink: 'https://www.instagram.com/noirress/'
        },
        'noirres-streetwear': {
            title: 'Noirres Streetwear',
            subtitle: 'Urban streetwear collection with Japanese influences',
            category: 'Streetwear',
            year: '2024',
            description: 'A premium streetwear collection that merges Japanese aesthetic principles with contemporary urban fashion. Noirres explores the concept of "wabi-sabi" (beauty in imperfection) through distressed fabrics, asymmetric cuts, and minimalist detailing. The collection features oversized silhouettes, technical fabrics, and subtle branding.',
            images: [
                { src: 'assets/designs/Noirres.png', caption: 'Noirres logo' },
            ],
            tools: ['Pattern Making', 'Technical Drawing', 'Fabric Sourcing', 'Photography', 'Branding'],
            timeframe: '6-8 weeks',
            instagramLink: 'https://www.instagram.com/noirres/'
        },
        'kazora-luxury': {
            title: 'Kazora Luxury Collection',
            subtitle: 'High-end luxury goods and exclusive accessories',
            category: 'Luxury',
            year: '2024',
            description: 'An exclusive luxury collection under the Kazora brand, featuring premium accessories, leather goods, and lifestyle products. This collection emphasizes exceptional craftsmanship, rare materials, and attention to detail. Each piece is designed to be timeless, functional, and a statement of refined taste.',
            images: [
                { src: 'assets/designs/KZ-T1-Red.jpeg', caption: 'Classy red tracksuit design.' },
                { src: 'assets/designs/KZ-T1-Blue.jpeg', caption: 'Classy blue tracksuit design.' },
                { src: 'assets/designs/KZ-T1-Green.jpeg', caption: 'Classy green tracksuit design.' },
                { src: 'assets/designs/KZ-T1-Black.jpeg', caption: 'Classy black tracksuit design.' },
                { src: 'assets/designs/KZ-T1-Brown.jpeg', caption: 'Classy brown tracksuit design.' }
                
            ],
            tools: ['Product Design', 'Material Science', 'Luxury Branding', 'Retail Design', 'Photography'],
            timeframe: '8-12 weeks',
            instagramLink: 'https://www.instagram.com/noirress/'
        }
    };
    
    // ====================
    // 2. FILTER FUNCTIONS
    // ====================
    
    // Function to filter cards
    function filterCards(category) {
        let delay = 0;
        let visibleCount = 0;
        
        designCards.forEach(card => {
            const cardCategories = card.dataset.category.split(' ');
            
            // Reset animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.animation = '';
            
            if (category === 'all' || cardCategories.includes(category)) {
                // Show with animation
                card.style.display = 'block';
                visibleCount++;
                
                // Stagger animation
                setTimeout(() => {
                    card.style.animation = `fadeInUp 0.6s ${delay}s var(--easing) forwards`;
                }, 10);
                delay += 0.05;
            } else {
                card.style.display = 'none';
            }
        });
        
        // If no cards visible, show message
        if (visibleCount === 0) {
            showNoResultsMessage(category);
        } else {
            hideNoResultsMessage();
        }
    }
    
    // Function to show no results message
    function showNoResultsMessage(category) {
        let noResults = document.querySelector('.no-results');
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-results text-center py-5';
            noResults.innerHTML = `
                <div class="no-results-content">
                    <i class="bi bi-search display-4 text-muted mb-3"></i>
                    <h3>No ${category === 'all' ? 'designs' : category + ' designs'} found</h3>
                    <p class="text-muted">Try selecting a different category or check back later for new designs.</p>
                </div>
            `;
            gridContainer.parentNode.insertBefore(noResults, gridContainer.nextSibling);
        }
    }
    
    // Function to hide no results message
    function hideNoResultsMessage() {
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.remove();
        }
    }
    
    // Add click events to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = '';
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Clear any existing transform
            this.style.transform = '';
            
            // Get filter value
            const filterValue = this.dataset.filter;
            
            // Filter cards
            filterCards(filterValue);
        });
    });
    
    // ====================
    // 3. CARD POPUP SYSTEM
    // ====================
    
    // DOM Elements for popup
    const cardPopup = document.getElementById('cardPopup');
    const closePopup = document.getElementById('closePopup');
    const popupTitle = document.querySelector('.card-popup-title');
    const popupSubtitle = document.querySelector('.card-popup-subtitle');
    const popupCategory = document.querySelector('.card-popup-category');
    const popupYear = document.querySelector('.card-popup-year');
    const pinterestGrid = document.getElementById('pinterestGrid');
    const popupDescription = document.querySelector('.card-popup-description');
    const popupActions = document.getElementById('popupActions');
    
    // Lightbox Elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.getElementById('closeLightbox');
    const prevImage = document.getElementById('prevImage');
    const nextImage = document.getElementById('nextImage');
    
    // State variables
    let currentCardImages = [];
    let currentImageIndex = 0;
    
    // Add click event to all design cards
    document.querySelectorAll('.design-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons/links inside the card
            if (e.target.closest('a') || e.target.closest('button')) {
                return;
            }
            
            const cardContainer = this.closest('.col-md-6');
            const cardId = cardContainer.dataset.cardId;
            
            if (cardId && designData[cardId]) {
                openCardPopup(designData[cardId]);
            }
        });
    });
    
    // Open Card Popup
    function openCardPopup(data) {
        // Set popup content
        popupTitle.textContent = data.title;
        popupSubtitle.textContent = data.subtitle;
        popupCategory.textContent = data.category;
        popupYear.textContent = data.year;
        popupDescription.textContent = data.description;
        
        // Update action buttons - ONLY Instagram button
        popupActions.innerHTML = '';
        
        if (data.instagramLink) {
            const instaBtn = document.createElement('a');
            instaBtn.href = data.instagramLink;
            instaBtn.className = 'card-popup-btn card-popup-btn-primary';
            instaBtn.target = '_blank';
            instaBtn.innerHTML = '<i class="bi bi-instagram"></i> View on Instagram';
            popupActions.appendChild(instaBtn);
        }
        
        // Clear and populate Pinterest grid
        pinterestGrid.innerHTML = '';
        currentCardImages = data.images;
        
        data.images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'pinterest-item';
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.caption;
            img.className = 'pinterest-image';
            img.loading = 'lazy';
            
            const caption = document.createElement('p');
            caption.className = 'pinterest-caption';
            caption.textContent = image.caption;
            
            // Add click event to open lightbox
            item.addEventListener('click', function() {
                openLightbox(index);
            });
            
            item.appendChild(img);
            item.appendChild(caption);
            pinterestGrid.appendChild(item);
        });
        
        // Show popup
        cardPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close Card Popup
    function closeCardPopup() {
        cardPopup.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ====================
    // 4. LIGHTBOX SYSTEM
    // ====================
    
    // Open Lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close Lightbox
    function closeLightboxFunc() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Update Lightbox Image
    function updateLightbox() {
        if (currentCardImages.length > 0) {
            const image = currentCardImages[currentImageIndex];
            lightboxImage.src = image.src;
            lightboxImage.alt = image.caption;
            lightboxCaption.textContent = image.caption;
        }
    }
    
    // Navigate Lightbox Images
    function navigateLightbox(direction) {
        currentImageIndex += direction;
        
        // Loop around
        if (currentImageIndex < 0) {
            currentImageIndex = currentCardImages.length - 1;
        } else if (currentImageIndex >= currentCardImages.length) {
            currentImageIndex = 0;
        }
        
        updateLightbox();
    }
    
    // ====================
    // 5. EVENT LISTENERS
    // ====================
    
    // Close popup events
    closePopup.addEventListener('click', closeCardPopup);
    cardPopup.addEventListener('click', function(e) {
        if (e.target === this) {
            closeCardPopup();
        }
    });
    
    // Close lightbox events
    closeLightbox.addEventListener('click', closeLightboxFunc);
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightboxFunc();
        }
    });
    
    // Lightbox navigation
    prevImage.addEventListener('click', () => navigateLightbox(-1));
    nextImage.addEventListener('click', () => navigateLightbox(1));
    
    // ====================
    // 6. KEYBOARD NAVIGATION
    // ====================
    
    document.addEventListener('keydown', function(e) {
        // Close with Escape
        if (e.key === 'Escape') {
            if (lightbox.classList.contains('active')) {
                closeLightboxFunc();
            } else if (cardPopup.classList.contains('active')) {
                closeCardPopup();
            }
        }
        
        // Lightbox navigation with arrow keys
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
        
        // Don't trigger if in input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        // Number keys 1-4 for filters
        if (e.key >= '1' && e.key <= '4') {
            const index = parseInt(e.key) - 1;
            if (filterButtons[index]) {
                filterButtons[index].click();
            }
        }
        
        // Space to scroll
        if (e.key === ' ') {
            e.preventDefault();
            window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }
    });
    
    // ====================
    // 7. INITIALIZATION
    // ====================
    
    // Initialize with all cards showing
    filterCards('all');
    
    // Add scroll reveal for grid items
    const revealCards = document.querySelectorAll('.col-md-6');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    revealCards.forEach(card => revealObserver.observe(card));
    
    // Add CSS for no results message
    const style = document.createElement('style');
    style.textContent = `
        .no-results {
            background: color-mix(in oklab, var(--bg-3) 40%, transparent);
            border: 1px solid var(--stroke);
            border-radius: var(--radius);
            margin: 2rem auto;
            max-width: 500px;
        }
        
        .no-results-content {
            padding: 3rem 2rem;
        }
        
        .no-results h3 {
            font-family: var(--font-display);
            margin-bottom: 1rem;
            color: var(--ink);
        }
    `;
    document.head.appendChild(style);
});