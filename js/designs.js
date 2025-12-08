/* Designs Page JavaScript - With Lightbox */

document.addEventListener('DOMContentLoaded', function() {
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const designCards = document.querySelectorAll('.designs-grid .col-md-6');
    const gridContainer = document.querySelector('.designs-grid');
    
    // Design data for lightbox
    const designData = {
        'cultural-fusion': {
            title: 'Cultural Fusion Series',
            category: 'Graphic Design',
            year: '2024',
            description: 'A series of digital illustrations merging Japanese, Arabic, and Indian visual elements into contemporary designs. This project explores cultural symbology through modern graphic techniques, creating visual narratives that bridge traditional aesthetics with contemporary design language.',
            images: 5,
            tools: ['Adobe Illustrator', 'Procreate', 'Photoshop'],
            timeframe: '2-3 weeks'
        },
        'cyber-samurai': {
            title: 'Cyber Samurai',
            category: 'Graphic Design',
            year: '2023',
            description: 'Neon-noir character designs blending traditional Japanese armor with cyberpunk aesthetics and futuristic elements. This series reimagines samurai warriors in a dystopian future where technology and tradition collide.',
            images: 4,
            tools: ['Photoshop', 'Blender 3D', 'After Effects'],
            timeframe: '3-4 weeks'
        },
        'yurei-streetwear': {
            title: 'Yūrei Streetwear',
            category: 'Clothing Design',
            year: '2023',
            description: 'A limited-edition streetwear collection featuring Japanese ghost lore motifs with modern cut-and-sew construction. Each piece tells a story from Japanese folklore through contemporary fashion.',
            images: 6,
            tools: ['Pattern Making', 'Screen Printing', 'Digital Embroidery'],
            timeframe: '4-6 weeks'
        },
        'desert-nomad': {
            title: 'Desert Nomad',
            category: 'Clothing Design',
            year: '2024',
            description: 'Apparel line inspired by Arabic desert culture, featuring flowing silhouettes and intricate embroidery patterns. This collection explores the intersection of nomadic traditions and modern fashion.',
            images: 3,
            tools: ['Digital Pattern Design', 'Embroidery Design', 'Fabric Dyeing'],
            timeframe: 'In Progress'
        },
        'urban-echoes': {
            title: 'Urban Echoes',
            category: 'Photography',
            year: '2024',
            description: 'Street photography collection exploring the intersection of traditional architecture and modern urban landscapes. Capturing moments where history and contemporary life converge.',
            images: 8,
            tools: ['Sony α7 III', 'Lightroom', 'Street Photography'],
            timeframe: '1-2 weeks'
        },
        'water-light': {
            title: 'Elements: Water & Light',
            category: 'Photography',
            year: '2023',
            description: 'Long-exposure photography capturing the dynamic relationship between water surfaces and changing light conditions. Meditative compositions that explore the interplay of natural elements.',
            images: 7,
            tools: ['Canon EOS R5', 'ND Filters', 'Long Exposure'],
            timeframe: '2 weeks'
        },
        'kazora-watches': {
            title: 'Kazora Watches',
            category: 'Logo & Branding',
            year: '2023',
            description: 'Complete brand identity for a luxury watch company, including logo, packaging, and visual language system. The design communicates precision, heritage, and exclusivity.',
            images: 4,
            tools: ['Logo Design', 'Brand Guidelines', 'Packaging Design'],
            timeframe: '3-4 weeks'
        },
        'chai-chronicles': {
            title: 'Chai Chronicles Café',
            category: 'Logo & Branding',
            year: '2024',
            description: 'Whimsical yet sophisticated branding for a specialty tea house, blending traditional motifs with contemporary design. Creating a warm, inviting atmosphere through visual identity.',
            images: 5,
            tools: ['Typography', 'Packaging Design', 'Environmental Graphics'],
            timeframe: '3 weeks'
        },
        'geometric-nature': {
            title: 'Geometric Nature',
            category: 'Graphic Design',
            year: '2024',
            description: 'Repeat patterns and textures inspired by natural forms, created for textile and surface design applications. Exploring the mathematical beauty in organic structures.',
            images: 3,
            tools: ['Adobe Fresco', 'Pattern Design', 'Vector Illustration'],
            timeframe: 'In Progress'
        },
        'tech-wear-fusion': {
            title: 'Tech-Wear Fusion',
            category: 'Clothing Design',
            year: '2023',
            description: 'Functional outerwear combining technical fabrics with traditional Indian textile patterns and modern streetwear aesthetics. Performance meets cultural expression.',
            images: 5,
            tools: ['Tech Wear Design', 'CAD Pattern', 'Functional Fabrics'],
            timeframe: '5-6 weeks'
        },
        'portrait-stories': {
            title: 'Portrait Stories',
            category: 'Photography',
            year: '2024',
            description: 'Portrait series documenting individuals at the intersection of multiple cultural identities and personal narratives. Exploring identity through intimate portraiture.',
            images: 6,
            tools: ['Studio Lighting', 'Capture One', 'Environmental Portraits'],
            timeframe: 'In Progress'
        },
        'lumina-tech': {
            title: 'Lumina Tech Solutions',
            category: 'Logo & Branding',
            year: '2024',
            description: 'Modern tech startup branding focused on clean lines, dynamic motion, and scalable identity systems. Communicating innovation and reliability.',
            images: 4,
            tools: ['Vector Design', 'Motion Graphics', 'Brand Strategy'],
            timeframe: 'In Progress'
        }
    };
    
    // Function to filter cards
    function filterCards(category) {
        let delay = 0;
        let visibleCount = 0;
        
        designCards.forEach(card => {
            const cardCategory = card.dataset.category;
            
            // Reset animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            if (category === 'all' || cardCategory === category) {
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
    
    // Lightbox functionality
    function openLightbox(designId) {
        const data = designData[designId];
        if (!data) return;
        
        // Create lightbox HTML
        const lightboxHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <button class="lightbox-close">
                    <i class="bi bi-x-lg"></i>
                </button>
                <div class="lightbox-header">
                    <h1 class="lightbox-title">${data.title}</h1>
                    <div class="lightbox-meta">
                        <span class="lightbox-category">${data.category}</span>
                        <span class="lightbox-year">${data.year}</span>
                    </div>
                </div>
                <div class="lightbox-body">
                    <div class="lightbox-grid">
                        ${Array.from({length: data.images}, (_, i) => `
                            <div class="lightbox-item">
                                <img src="https://images.unsplash.com/photo-${1557300000 + i * 10000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                                     alt="${data.title} - Image ${i + 1}">
                            </div>
                        `).join('')}
                    </div>
                    <div class="lightbox-description">
                        ${data.description}
                    </div>
                    <div class="lightbox-details">
                        <h3>Project Details</h3>
                        <div class="details-grid">
                            <div class="detail-item">
                                <span class="detail-label">Category</span>
                                <span class="detail-value">${data.category}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Year</span>
                                <span class="detail-value">${data.year}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Images</span>
                                <span class="detail-value">${data.images} photos</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Timeframe</span>
                                <span class="detail-value">${data.timeframe}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Tools Used</span>
                                <span class="detail-value">${data.tools.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Create lightbox if it doesn't exist
        let lightbox = document.querySelector('.lightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            document.body.appendChild(lightbox);
        }
        
        lightbox.innerHTML = lightboxHTML;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add event listeners
        const overlay = lightbox.querySelector('.lightbox-overlay');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                lightbox.innerHTML = '';
            }, 300);
        }
        
        overlay.addEventListener('click', closeLightbox);
        closeBtn.addEventListener('click', closeLightbox);
        
        // Close with Escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
        
        // Add click to lightbox items
        lightbox.querySelectorAll('.lightbox-item').forEach(item => {
            item.addEventListener('click', function() {
                // You could add a fullscreen image viewer here
                console.log('View image in fullscreen');
            });
        });
    }
    
    // Add click events to design cards
    designCards.forEach(card => {
        const cardId = card.dataset.category + '-' + 
                      card.querySelector('.design-title').textContent
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, '');
        
        // Set data attribute for hover description
        const description = card.querySelector('.design-desc').textContent;
        card.querySelector('.design-card').setAttribute('data-description', description);
        
        card.addEventListener('click', function(e) {
            if (e.target.closest('.filter-btn')) return; // Don't trigger if clicking filter button
            
            openLightbox(cardId);
        });
    });
    
    // Keyboard shortcuts for filters
    document.addEventListener('keydown', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        // Number keys 1-5 for filters
        if (e.key >= '1' && e.key <= '5') {
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