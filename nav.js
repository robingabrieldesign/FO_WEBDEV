document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery');
    let isDragging = false; // Track if the left-click is held down
    let startX, scrollLeft;
    let currentZoomLevel = 2;  // Start with 2 columns on load
    
    // Function to randomize the images in the gallery
    function shuffleGallery() {
        const images = Array.from(galleryContainer.children);
        for (let i = images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            galleryContainer.appendChild(images[j]);
        }
    }

    // Randomize gallery on page load
    shuffleGallery();

    // Function to handle dragging
    galleryContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - galleryContainer.offsetLeft;
        scrollLeft = galleryContainer.scrollLeft;
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
        const walk = (x - startX) * 3; // Speed of scrolling
        galleryContainer.scrollLeft = scrollLeft - walk;
    });

    // Zoom in/out with mouse wheel
    window.addEventListener('wheel', (e) => {
        e.preventDefault(); // Prevent the default scroll behavior
        if (e.deltaY < 0 && currentZoomLevel > 2) {
            // Zoom in (scrolling up)
            currentZoomLevel--;
            adjustGrid();
        } else if (e.deltaY > 0 && currentZoomLevel < 10) {
            // Zoom out (scrolling down)
            currentZoomLevel++;
            adjustGrid();
        }
    });

    // Adjust grid based on current zoom level
    function adjustGrid() {
        galleryContainer.style.gridTemplateColumns = `repeat(${currentZoomLevel}, 1fr)`;
    }

    // Initially set the grid to 2 columns
    adjustGrid();
});
