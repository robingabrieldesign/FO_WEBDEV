document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery');
    let isDragging = false;
    let startX, scrollLeft, startY, scrollTop;
    let currentZoomLevel = 2; // Default zoom level
    let galleryRect = galleryContainer.getBoundingClientRect(); // Get initial bounding box for zooming calculations

    // Page load fade-in
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);

    // Fade out before navigation
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget.getAttribute('href');
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = target;
            }, 500); 
        });
    });

    // Handle dragging in the gallery
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

    // Zoom in/out buttons
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');

    zoomInButton.addEventListener('click', () => {
        if (currentZoomLevel > 2) {
            currentZoomLevel--;
            adjustGrid();
        }
    });

    zoomOutButton.addEventListener('click', () => {
        if (currentZoomLevel < 15) {
            currentZoomLevel++;
            adjustGrid();
        }
    });

    // Pinch-to-zoom on mobile and wheel zoom on desktop
    galleryContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomDelta = e.deltaY > 0 ? 1 : -1;
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
        currentZoomLevel = Math.max(2, Math.min(15, currentZoomLevel + zoomDelta));

        if (currentZoomLevel === previousZoomLevel) return;

        const relativeX = (cursorX - galleryRect.left) / galleryRect.width;
        const relativeY = (cursorY - galleryRect.top) / galleryRect.height;

        adjustGrid();

        galleryRect = galleryContainer.getBoundingClientRect();
        const newScrollLeft = relativeX * galleryRect.width - galleryContainer.clientWidth / 2;
        const newScrollTop = relativeY * galleryRect.height - galleryContainer.clientHeight / 2;

        galleryContainer.scrollLeft = newScrollLeft;
        galleryContainer.scrollTop = newScrollTop;
    }

    function adjustGrid() {
        galleryContainer.style.gridTemplateColumns = `repeat(${currentZoomLevel}, 1fr)`;
    }

    // Shuffle images in the gallery on load
    function shuffleGallery() {
        const images = Array.from(galleryContainer.children);
        const shuffledImages = images.sort(() => Math.random() - 0.5);
        galleryContainer.innerHTML = '';
        shuffledImages.forEach(image => {
            galleryContainer.appendChild(image);
        });
    }

    // Randomize gallery and set default grid on page load
    shuffleGallery();
    adjustGrid();
});
