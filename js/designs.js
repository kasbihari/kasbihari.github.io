// Designs Page JavaScript - With Pinterest Card Popup

document.addEventListener('DOMContentLoaded', function() {
    
    // ====================
    // 1. FILTER FUNCTIONALITY
    // ====================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const designCards = document.querySelectorAll('.designs-grid .col-md-6');
    const gridContainer = document.querySelector('.designs-grid');
    
    // Design data for popup
    const designData = {
        'cultural-fusion': {
            title: 'Cultural Fusion Series',
            subtitle: 'Digital illustrations merging visual elements from multiple cultures',
            category: 'Graphic Design',
            year: '2024',
            description: 'A series of digital illustrations merging Japanese, Arabic, and Indian visual elements into contemporary designs. This project explores cultural symbology through modern graphic techniques, creating visual narratives that bridge traditional aesthetics with contemporary design language.',
            images: [
                { src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Japanese wave patterns meet Arabic calligraphy' },
                { src: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80', caption: 'Mandala-inspired geometric patterns' },
                { src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Color palette inspired by traditional textiles' },
                { src: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Digital painting process' },
                { src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Final series presentation' }
            ],
            tools: ['Adobe Illustrator', 'Procreate', 'Photoshop'],
            timeframe: '2-3 weeks',
            liveLink: '#',
            codeLink: '#'
        },
        'cyber-samurai': {
            title: 'Cyber Samurai',
            subtitle: 'Neon-noir character designs blending traditional armor with cyberpunk',
            category: 'Graphic Design',
            year: '2023',
            description: 'Neon-noir character designs blending traditional Japanese armor with cyberpunk aesthetics and futuristic elements. This series reimagines samurai warriors in a dystopian future where technology and tradition collide.',
            images: [
                { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Main character design' },
                { src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Weapon design concepts' },
                { src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Neon lighting studies' },
                { src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Environment concept art' }
            ],
            tools: ['Photoshop', 'Blender 3D', 'After Effects'],
            timeframe: '3-4 weeks',
            liveLink: '#',
            codeLink: '#'
        },
        'yurei-streetwear': {
            title: 'Yūrei Streetwear',
            subtitle: 'Limited-edition streetwear collection with Japanese ghost lore motifs',
            category: 'Clothing Design',
            year: '2023',
            description: 'A limited-edition streetwear collection featuring Japanese ghost lore motifs with modern cut-and-sew construction. Each piece tells a story from Japanese folklore through contemporary fashion.',
            images: [
                { src: 'https://images.unsplash.com/photo-1558769132-cb1fc898c1e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Collection overview' },
                { src: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Yūrei spirit print design' },
                { src: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Hoodie detail - embroidery' },
                { src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Model photography' },
                { src: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Lookbook spread' },
                { src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Packaging design' }
            ],
            tools: ['Pattern Making', 'Screen Printing', 'Digital Embroidery'],
            timeframe: '4-6 weeks',
            liveLink: '#',
            codeLink: '#'
        },
        'desert-nomad': {
            title: 'Desert Nomad',
            subtitle: 'Apparel inspired by Arabic desert culture with flowing silhouettes',
            category: 'Clothing Design',
            year: '2024',
            description: 'Apparel line inspired by Arabic desert culture, featuring flowing silhouettes and intricate embroidery patterns. This collection explores the intersection of nomadic traditions and modern fashion.',
            images: [
                { src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Collection concept board' },
                { src: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Fabric selection and samples' },
                { src: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Detailed embroidery patterns' }
            ],
            tools: ['Digital Pattern Design', 'Embroidery Design', 'Fabric Dyeing'],
            timeframe: 'In Progress',
            liveLink: '#',
            codeLink: '#'
        },
        'urban-echoes': {
            title: 'Urban Echoes',
            subtitle: 'Street photography exploring traditional and modern urban landscapes',
            category: 'Photography',
            year: '2024',
            description: 'Street photography collection exploring the intersection of traditional architecture and modern urban landscapes. Capturing moments where history and contemporary life converge.',
            images: [
                { src: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Traditional market alley' },
                { src: 'https://images.unsplash.com/photo-1559131397-f94da358f059?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Modern architecture reflection' },
                { src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Street scene at golden hour' },
                { src: 'https://images.unsplash.com/photo-1538469990725-c8e59f1c3e43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Urban geometry patterns' },
                { src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Cultural juxtaposition' },
                { src: 'https://images.unsplash.com/photo-1542327897-d73f4005b533?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Night photography series' },
                { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Urban textures' },
                { src: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Final curated selection' }
            ],
            tools: ['Sony α7 III', 'Lightroom', 'Street Photography'],
            timeframe: '1-2 weeks',
            liveLink: '#',
            codeLink: '#'
        },
        'water-light': {
            title: 'Elements: Water & Light',
            subtitle: 'Long-exposure photography capturing water-light relationships',
            category: 'Photography',
            year: '2023',
            description: 'Long-exposure photography capturing the dynamic relationship between water surfaces and changing light conditions. Meditative compositions that explore the interplay of natural elements.',
            images: [
                { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Morning reflections' },
                { src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Water surface patterns' },
                { src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Sunset on water' },
                { src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Long exposure river' },
                { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Night water reflections' },
                { src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Abstract water patterns' },
                { src: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Series exhibition layout' }
            ],
            tools: ['Canon EOS R5', 'ND Filters', 'Long Exposure'],
            timeframe: '2 weeks',
            liveLink: '#',
            codeLink: '#'
        },
        'kazora-watches': {
            title: 'Kazora Watches',
            subtitle: 'Complete luxury watch brand identity system',
            category: 'Logo & Branding',
            year: '2023',
            description: 'Complete brand identity for a luxury watch company, including logo, packaging, and visual language system. The design communicates precision, heritage, and exclusivity.',
            images: [
                { src: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Logo development sketches' },
                { src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Final logo mark' },
                { src: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Packaging design' },
                { src: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Brand guidelines book' }
            ],
            tools: ['Logo Design', 'Brand Guidelines', 'Packaging Design'],
            timeframe: '3-4 weeks',
            liveLink: '#',
            codeLink: '#'
        },
        'chai-chronicles': {
            title: 'Chai Chronicles Café',
            subtitle: 'Whimsical branding for specialty tea house',
            category: 'Logo & Branding',
            year: '2024',
            description: 'Whimsical yet sophisticated branding for a specialty tea house, blending traditional motifs with contemporary design. Creating a warm, inviting atmosphere through visual identity.',
            images: [
                { src: 'https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Logo and wordmark' },
                { src: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Illustration system' },
                { src: 'https://images.unsplash.com/photo-1517256064527-09c73fc073e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Menu design' },
                { src: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Tea packaging series' },
                { src: 'https://images.unsplash.com/photo-1594736797933-d1004ba2bfc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Store signage mockup' }
            ],
            tools: ['Typography', 'Packaging Design', 'Environmental Graphics'],
            timeframe: '3 weeks',
            liveLink: '#',
            codeLink: '#'
        },
        'geometric-nature': {
            title: 'Geometric Nature',
            subtitle: 'Repeat patterns inspired by organic forms',
            category: 'Graphic Design',
            year: '2024',
            description: 'Repeat patterns and textures inspired by natural forms, created for textile and surface design applications. Exploring the mathematical beauty in organic structures.',
            images: [
                { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Pattern research and sketches' },
                { src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Digital pattern development' },
                { src: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Color variations' }
            ],
            tools: ['Adobe Fresco', 'Pattern Design', 'Vector Illustration'],
            timeframe: 'In Progress',
            liveLink: '#',
            codeLink: '#'
        },
        'tech-wear-fusion': {
            title: 'Tech-Wear Fusion',
            subtitle: 'Functional outerwear combining technical fabrics with traditional patterns',
            category: 'Clothing Design',
            year: '2023',
            description: 'Functional outerwear combining technical fabrics with traditional Indian textile patterns and modern streetwear aesthetics. Performance meets cultural expression.',
            images: [
                { src: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Jacket design concept' },
                { src: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Fabric technology details' },
                { src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Pattern integration studies' },
                { src: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Prototype testing' },
                { src: 'https://images.unsplash.com/photo-1539533018447-63df8b6f9cc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Final collection presentation' }
            ],
            tools: ['Tech Wear Design', 'CAD Pattern', 'Functional Fabrics'],
            timeframe: '5-6 weeks',
            liveLink: '#',
            codeLink: '#'
        },
        'portrait-stories': {
            title: 'Portrait Stories',
            subtitle: 'Cultural identity portrait series',
            category: 'Photography',
            year: '2024',
            description: 'Portrait series documenting individuals at the intersection of multiple cultural identities and personal narratives. Exploring identity through intimate portraiture.',
            images: [
                { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Portrait 1: Cultural fusion' },
                { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Portrait 2: Identity exploration' },
                { src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Portrait 3: Personal narrative' },
                { src: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Portrait 4: Heritage and modernity' },
                { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Portrait 5: Cultural duality' },
                { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Series exhibition concept' }
            ],
            tools: ['Studio Lighting', 'Capture One', 'Environmental Portraits'],
            timeframe: 'In Progress',
            liveLink: '#',
            codeLink: '#'
        },
        'lumina-tech': {
            title: 'Lumina Tech Solutions',
            subtitle: 'Modern tech startup branding',
            category: 'Logo & Branding',
            year: '2024',
            description: 'Modern tech startup branding focused on clean lines, dynamic motion, and scalable identity systems. Communicating innovation and reliability.',
            images: [
                { src: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Brand mark development' },
                { src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Color system and typography' },
                { src: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Digital applications' },
                { src: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', caption: 'Brand guidelines document' }
            ],
            tools: ['Vector Design', 'Motion Graphics', 'Brand Strategy'],
            timeframe: 'In Progress',
            liveLink: '#',
            codeLink: '#'
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
            const cardCategory = card.dataset.category;
            
            // Reset animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.animation = '';
            
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
        
        // Update action buttons
        popupActions.innerHTML = '';
        if (data.liveLink) {
            const liveBtn = document.createElement('a');
            liveBtn.href = data.liveLink;
            liveBtn.className = 'card-popup-btn card-popup-btn-primary';
            liveBtn.target = '_blank';
            liveBtn.innerHTML = '<i class="bi bi-eye"></i> Live Preview';
            popupActions.appendChild(liveBtn);
        }
        
        if (data.codeLink) {
            const codeBtn = document.createElement('a');
            codeBtn.href = data.codeLink;
            codeBtn.className = 'card-popup-btn card-popup-btn-secondary';
            codeBtn.target = '_blank';
            codeBtn.innerHTML = '<i class="bi bi-github"></i> View Code';
            popupActions.appendChild(codeBtn);
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