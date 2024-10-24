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
    
            // Add loaded class to images after a short delay to trigger transition
            setTimeout(() => {
                gallery.querySelectorAll('img').forEach(image => {
                    image.classList.add('loaded'); // Trigger the fade-in animation
                });
            }, 100); // Delay to ensure the DOM updates
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
    const gallery = document.getElementById("gallery");

    window.onmousemove = (e) => {
      const mouseX = e.clientX,
        mouseY = e.clientY;

      const xDecimal = mouseX / window.innerWidth,
        yDecimal = mouseY / window.innerHeight;

      const maxX = gallery.offsetWidth - window.innerWidth,
        maxY = gallery.offsetHeight - window.innerHeight;

      const panX = maxX * xDecimal * -1,
        panY = maxY * yDecimal * -1;

      gallery.animate(
        {
          transform: `translate(${panX}px, ${panY}px)`,
        },
        {
          duration: 4000,
          fill: "forwards",
          easing: "ease",
        }
      );
    };

    const radius = 300,
      maxScale = 3,
      blocks = document.querySelectorAll(".block"),
      radius2 = radius * radius,
      container = document.querySelector("#gallery");

    blocks.forEach((block) => {
      let b = block.getBoundingClientRect();
      (block.cx = b.left + b.width / 2 + window.pageXOffset),
        (block.cy = b.top + b.height / 2 + window.pageYOffset);

      block.tween = gsap
        .to(block, { scale: maxScale, ease: "power1.in", paused: true })
        .progress(1)
        .progress(0);
    });

    document.addEventListener("mousemove", (e) => {
      let i = blocks.length,
        dx,
        dy,
        block;
      while (i--) {
        block = blocks[i];
        dx = (block.cx - e.pageX) ** 2;
        dy = (block.cy - e.pageY) ** 2;
        block.tween.progress(1 - (dx + dy) / radius2);
      }
    });
});
