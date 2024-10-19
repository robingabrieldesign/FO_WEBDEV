document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery');
    let isDragging = false;
    let startX, scrollLeft, startY, scrollTop;
    let currentZoomLevel = 2; // Default zoom level
    let isMobile = window.matchMedia("(max-width: 768px)").matches; // Check if on mobile
    let galleryRect = galleryContainer.getBoundingClientRect(); // Get initial bounding box for zooming calculations

    // Page load fade-in
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);  // Delay for fade-in to ensure all content is loaded

    // Fade out before navigation
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget.getAttribute('href');
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = target;
            }, 500);  // Give time for fade-out before navigation
        });
    });

    // Image click fade-out transition
    galleryContainer.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', () => {
            document.body.style.opacity = '0';
            setTimeout(() => {
                // Navigate or do something with the image
            }, 500);
        });
    });

    // Handle dragging and zooming gallery
    galleryContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - galleryContainer.offsetLeft;
        startY = e.pageY - galleryContainer.offsetTop;
        scrollLeft = galleryContainer.scrollLeft;
        scrollTop = galleryContainer.scrollTop;
    });

    galleryContainer.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    galleryContainer.addEventListener('mouseup', () => {
        isDragging = false;
    });

    galleryContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - galleryContainer.offsetLeft;
        const y = e.pageY - galleryContainer.offsetTop;
        const walkX = (x - startX) * 3;
        const walkY = (y - startY) * 3;
        galleryContainer.scrollLeft = scrollLeft - walkX;
        galleryContainer.scrollTop = scrollTop - walkY;
    });

    // Pinch-to-zoom on mobile and wheel zoom on desktop
    galleryContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomDelta = e.deltaY > 0 ? 1 : -1; // Zoom in or out based on wheel scroll
        updateZoom(e.pageX, e.pageY, zoomDelta);
    });

    let pinchStartDistance = null;
    galleryContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            pinchStartDistance = getDistance(e.touches);
        }
    });

    galleryContainer.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2 && pinchStartDistance !== null) {
            const currentDistance = getDistance(e.touches);
            const zoomDelta = currentDistance > pinchStartDistance ? -1 : 1;
            updateZoom(
                (e.touches[0].clientX + e.touches[1].clientX) / 2,
                (e.touches[0].clientY + e.touches[1].clientY) / 2,
                zoomDelta
            );
            pinchStartDistance = currentDistance;
        }
    });

    function getDistance(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Adjust grid layout and maintain zooming logic centered on the cursor
    function updateZoom(cursorX, cursorY, zoomDelta) {
        const previousZoomLevel = currentZoomLevel;
        currentZoomLevel = Math.max(2, Math.min(13, currentZoomLevel + zoomDelta)); // Zoom range between 2 and 13

        if (currentZoomLevel === previousZoomLevel) return; // No zoom change

        // Calculate the relative cursor position within the gallery before zoom
        const relativeX = (cursorX - galleryRect.left) / galleryRect.width;
        const relativeY = (cursorY - galleryRect.top) / galleryRect.height;

        // Update grid template based on zoom level
        adjustGrid();

        // Update scroll positions to keep zoom centered on the cursor
        galleryRect = galleryContainer.getBoundingClientRect(); // Update gallery rect after zoom
        const newScrollLeft = relativeX * galleryRect.width - galleryContainer.clientWidth / 2;
        const newScrollTop = relativeY * galleryRect.height - galleryContainer.clientHeight / 2;

        galleryContainer.scrollLeft = newScrollLeft;
        galleryContainer.scrollTop = newScrollTop;
    }
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery');
    const loadingScreen = document.querySelector('.loading-screen');

    let isDragging = false;
    let startX, scrollLeft, startY, scrollTop;
    let currentZoomLevel = 2; // Default zoom level
    let isMobile = window.matchMedia("(max-width: 768px)").matches; // Check if on mobile
    let galleryRect = galleryContainer.getBoundingClientRect(); // Get initial bounding box for zooming calculations

    // Page load fade-in and hide loading screen
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        loadingScreen.classList.add('hidden'); // Hide the loading screen after 1s
    }, 1000);  // Delay to simulate the loading

    // Fade out before navigation
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget.getAttribute('href');
            loadingScreen.classList.remove('hidden'); // Show the loading screen
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = target;
            }, 1000);  // Delay for fade-out before navigation
        });
    });

    // Image click fade-out transition
    galleryContainer.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', () => {
            loadingScreen.classList.remove('hidden'); // Show the loading screen
            document.body.style.opacity = '0';
            setTimeout(() => {
                // Navigate or do something with the image
            }, 500);
        });
    });

    // ... (rest of your existing gallery handling code) ...
});

    function adjustGrid() {
        galleryContainer.style.gridTemplateColumns = `repeat(${currentZoomLevel}, 1fr)`;
    }

    function shuffleGallery() {
        const images = Array.from(galleryContainer.children);
        const shuffledImages = images.sort(() => Math.random() - 0.5);
        galleryContainer.innerHTML = '';
        shuffledImages.forEach(image => {
            galleryContainer.appendChild(image);
        });
    }

    // Randomize gallery on page load
    shuffleGallery();
    // Ensure the grid is initially set to 2 columns on load
    adjustGrid();
});
