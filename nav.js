document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;
    let currentZoomLevel = 2; // Default zoom level

    // Function to shuffle images
    function shuffleGallery() {
        const images = Array.from(gallery.children);
        const shuffledImages = images.sort(() => Math.random() - 0.5); // Randomize order
        gallery.innerHTML = ''; // Clear the gallery
        shuffledImages.forEach(img => gallery.appendChild(img)); // Append images in random order
    }

    // Function to adjust the grid based on zoom level
    function adjustGrid() {
        gallery.style.gridTemplateColumns = `repeat(${currentZoomLevel}, 1fr)`;
    }

    // Zoom in and out functionality
    document.getElementById('zoom-in').addEventListener('click', () => {
        if (currentZoomLevel < 15) {
            currentZoomLevel++;
            adjustGrid();
        }
    });

    document.getElementById('zoom-out').addEventListener('click', () => {
        if (currentZoomLevel > 2) {
            currentZoomLevel--;
            adjustGrid();
        }
    });

    // Drag functionality
    gallery.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - gallery.offsetLeft;
        startY = e.pageY - gallery.offsetTop;
        scrollLeft = gallery.scrollLeft;
        scrollTop = gallery.scrollTop;
    });

    gallery.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    gallery.addEventListener('mouseup', () => {
        isDragging = false;
    });

    gallery.addEventListener('mousemove', (e) => {
        if (!isDragging) return; // Stop the fn from running
        e.preventDefault(); // Prevent default behavior
        const x = e.pageX - gallery.offsetLeft;
        const y = e.pageY - gallery.offsetTop;

        const walkX = (x - startX) * 2; // Scroll-fast
        const walkY = (y - startY) * 2;

        gallery.scrollLeft = scrollLeft - walkX;
        gallery.scrollTop = scrollTop - walkY;
    });

    // Initialize the gallery with shuffled images
    shuffleGallery();
    adjustGrid();
});
