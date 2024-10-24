document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery');
    let currentZoomLevel = 2; // Default zoom level (2 columns)
    let isDragging = false;
    let startX, scrollLeft, startY, scrollTop;
  
    const maxZoomLevel = 13; // Maximum grid columns
    const minZoomLevel = 2;  // Minimum grid columns
  
    // Fade in effect on page load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
  
    // Fade out effect on link navigation
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
  
    // Dragging functionality
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
        if (currentZoomLevel < maxZoomLevel) {
            currentZoomLevel++;
            adjustGrid();
        }
    });
  
    zoomOutButton.addEventListener('click', () => {
        if (currentZoomLevel > minZoomLevel) {
            currentZoomLevel--;
            adjustGrid();
        }
    });
  
    // Adjust grid layout when zoom level changes
    function adjustGrid() {
        galleryContainer.style.gridTemplateColumns = `repeat(${currentZoomLevel}, 1fr)`;
    }
  
    // Shuffle images on page load
    function shuffleGallery() {
        const images = Array.from(galleryContainer.children);
        const shuffledImages = images.sort(() => Math.random() - 0.5);
        galleryContainer.innerHTML = '';
        shuffledImages.forEach(image => {
            galleryContainer.appendChild(image);
        });
    }
  
    // Initialize the gallery grid and shuffle on load
    shuffleGallery();
    adjustGrid();
  
    // Panning and Hover Scaling System
  
    const radius = 300;
    const maxScale = 3;
    const blocks = document.querySelectorAll('.block'); // Assuming images are wrapped in a '.block' class
    const radiusSquared = radius * radius;
  
    // Set up initial positions for hover scaling
    blocks.forEach((block) => {
        let b = block.getBoundingClientRect();
        block.cx = b.left + b.width / 2 + window.pageXOffset;
        block.cy = b.top + b.height / 2 + window.pageYOffset;
  
        block.tween = gsap.to(block, { scale: maxScale, ease: 'power1.in', paused: true }).progress(0);
    });
  
    // Mouse hover movement and scaling
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX, mouseY = e.clientY;
  
        // Pan the gallery based on mouse position
        const xDecimal = mouseX / window.innerWidth, yDecimal = mouseY / window.innerHeight;
        const maxX = galleryContainer.offsetWidth - window.innerWidth, maxY = galleryContainer.offsetHeight - window.innerHeight;
        const panX = maxX * xDecimal * -1, panY = maxY * yDecimal * -1;
  
        galleryContainer.animate({ transform: `translate(${panX}px, ${panY}px)` }, { duration: 4000, fill: 'forwards', easing: 'ease' });
  
        // Scale blocks based on proximity to the cursor
        blocks.forEach((block) => {
            const dx = (block.cx - e.pageX) ** 2;
            const dy = (block.cy - e.pageY) ** 2;
            block.tween.progress(1 - (dx + dy) / radiusSquared);
        });
    });
  });
  