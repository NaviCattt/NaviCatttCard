
/* 1. Navbar */
class AppNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <nav class="nav-menu">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="Commissions.html">Commissions</a></li>
                <li><a href="Terms.html">Terms & Conditions</a></li>
            </ul>
        </nav>
        `;
    this.highlightActiveLink();
  }

  highlightActiveLink() {
    const currentPath = window.location.pathname;
    const links = this.querySelectorAll("a");
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (currentPath.includes(href)) {
        link.classList.add("active");
      }
    });
  }
}
customElements.define("app-navbar", AppNavbar);


/* 2. Footer */
class AppFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer style="text-align: center; font-weight: 600; padding: 2rem; margin-top: 3rem; border-top: 1px dashed var(--accent-color); color: var(--text-secondary);">
            <p>
            
            </p>
            <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; opacity: 0.8;">
                 <!-- Discord Icon -->
                <div style="display: flex; align-items: center; gap: 5px;">
                     <svg viewBox="0 0 512 512" style="width: 20px; height: 20px; fill: currentColor;"><path d="M433.44,93.26c-33.2-15.24-68.23-26.11-104.22-32.35l-1.66,0.8c-4.51,8-9.5,18.46-12.99,26.66   c-38.8-5.89-78.26-5.89-117.05,0c-3.89-9.13-8.29-18.02-13.18-26.66l-1.66-0.8c-36,6.21-71.04,17.09-104.22,32.35l-0.67,0.58   C11.4,193-6.81,289.74,2.12,385.26l0.67,1.18c38.65,28.63,81.87,50.48,127.84,64.64l1.79-0.61c9.86-13.44,18.62-27.62,26.18-42.53   l-0.32-1.89l-0.58-0.35c-13.79-5.3-27.14-11.66-39.94-19.04l-0.64-2.11l0.48-0.61l7.94-6.24l1.63-0.22   c83.81,38.27,174.53,38.27,257.31,0l1.7,0.22l7.94,6.24l0.35,2.28l-0.48,0.44c-12.77,7.44-26.14,13.8-39.97,19.01l-0.96,0.96   l0.1,1.31c7.68,14.88,16.48,29.09,26.14,42.53l1.79,0.61c46.04-14.11,89.34-35.97,128.03-64.64l0.67-1.18   c10.69-110.43-17.89-206.37-75.71-291.39L433.44,93.26z M171.11,327.08c-25.25,0-46.02-23.17-46.02-51.58   c0-28.45,20.38-51.62,46.02-51.62c25.82,0,46.4,23.36,46.02,51.62C217.12,303.91,196.74,327.08,171.11,327.08z M341.22,327.08   c-25.22,0-46.02-23.17-46.02-51.58c0-28.45,20.38-51.62,46.02-51.62c25.82,0,46.43,23.36,46.02,51.62   C387.23,303.91,367.04,327.08,341.22,327.08z"/></svg>
                    <span>naviowo</span>
                </div>
                 <!-- Email Icon -->
                <div style="display: flex; align-items: center; gap: 5px;">
                     <svg viewBox="0 0 512 512" style="width: 20px; height: 20px; fill: currentColor;"><path d="M460.2,51.4H50.9C22.8,51.4,0,74.2,0,102.3v307.4c0,28.1,22.8,50.9,50.9,50.9h410.1   c28.1,0,50.9-22.8,50.9-50.9V102.3C512,74.2,489.2,51.4,460.2,51.4z M460.2,409.7H50.9V153.2l204.6,128.2l204.6-128.2V409.7z    M255.6,230.5L50.9,102.3h410.1L255.6,230.5z"/></svg>
                    <span>n4vi874@gmail.com</span>
                </div>
            </div>
        </footer>
        `;
    }
}
customElements.define("app-footer", AppFooter);


/* 3. Gallery */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.art-card');
    if(cards.length === 0) return; // Exit if no gallery present


    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <button class="lightbox-nav prev">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <img src="" alt="Full view">
        <button class="lightbox-nav next">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.prev');
    const nextBtn = lightbox.querySelector('.next');

    let currentImages = []; 
    let currentIndex = 0;

    // Navigation Functions
    const showImage = (index) => {
        if (index < 0) index = currentImages.length - 1;
        if (index >= currentImages.length) index = 0;
        currentIndex = index;
        lightboxImg.src = currentImages[currentIndex];
    };

    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex + 1); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex - 1); });

    // Close Lightbox functions
    const closeLightbox = () => lightbox.classList.remove('active');
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    cards.forEach(card => {
        const mainImage = card.querySelector('.card-image-container img');
        const imageContainer = card.querySelector('.card-image-container');
        const thumbnails = card.querySelectorAll('.thumbnail');

        if (!mainImage || thumbnails.length === 0) return;

        // Open Lightbox on Main Image Click
        mainImage.parentElement.addEventListener('click', () => {
            currentImages = Array.from(thumbnails).map(thumb => thumb.getAttribute('src'));
            /* Fallback if no thumbnails: use main image */
            if(currentImages.length === 0) currentImages = [mainImage.src];

            const currentSrc = mainImage.getAttribute('src');
            currentIndex = currentImages.findIndex(src => mainImage.src.includes(src)) || 0;
            if (currentIndex === -1) currentIndex = 0;

            showImage(currentIndex);
            lightbox.classList.add('active');
        });

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                e.stopPropagation(); 
                const newSrc = thumb.getAttribute('src');
                const newAlt = thumb.getAttribute('alt');
                const newBg = thumb.getAttribute('data-bg') || '#ede4da';
                
                mainImage.style.opacity = '0';
                
                setTimeout(() => {
                    mainImage.setAttribute('src', newSrc);
                    if (newAlt) mainImage.setAttribute('alt', newAlt);
                    if (imageContainer) {
                         imageContainer.style.backgroundColor = newBg;
                    }
                    mainImage.style.opacity = '1';
                }, 200);

                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    });
});
/* 4. Dynamic Status Check */
document.addEventListener('DOMContentLoaded', () => {
    fetch('status.json')
        .then(response => response.json())
        .then(data => {
            const isOpen = data.commissionsOpen;
            const statusText = isOpen ? data.statusTextOpen : data.statusTextClosed;
            const statusClass = isOpen ? 'open' : 'closed';

            // 1. Update Index Badge (if present)
            const indexBadge = document.getElementById('index-status-badge');
            if (indexBadge) {
                indexBadge.textContent = ` Commissions ${statusText} `;
                indexBadge.classList.add(statusClass);
            }

            // 2. Update Commissions Page Text (if present)
            const commPageStatus = document.getElementById('commissions-page-status');
            if (commPageStatus) {
                commPageStatus.textContent = statusText;
                commPageStatus.classList.add(statusClass);
            }
        })
        .catch(error => console.error('Error loading status:', error));
});
