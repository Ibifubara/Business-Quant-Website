'use strict'

const links = document.querySelector('.links')
const menuIcon = document.querySelector('#menuIcon')
const hamburger = document.querySelector('.hamburger')
const tabButtons = document.querySelectorAll(".tab-button");
const tabItems = document.querySelectorAll(".tab-item");
const grid = document.querySelector(".testimonials-grid");
const testimonialsCard = document.querySelectorAll(".testimonials-card")
const prevReview = document.getElementById("prevReview");
const nextReview = document.getElementById("nextReview");

// Toggle mobile menu
hamburger.addEventListener('click', function() {
    links.classList.toggle('active')

    if (links.classList.contains('active')) {
        menuIcon.classList.replace("bx-menu-alt-right", "bx-x");
    } else {
        menuIcon.classList.replace("bx-x", "bx-menu-alt-right");
    }
});

// Tabs functionality
tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const target = button.dataset.tab; // Get target from data attribute

        // Remove 'active' from all buttons & tab items
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabItems.forEach(item => item.classList.remove("active"));

        // Add 'active' to the clicked button & matching tab content
        button.classList.add("active");
        document.querySelector(`.tab-item[data-content="${target}"]`).classList.add("active");

        // Initialize carousel for the newly activated tab
        initializeCarousel(target);
    });
});

// Function to initialize the correct carousel inside the active tab
function initializeCarousel(target) {
    const activeTab = document.querySelector(`.tab-item[data-content="${target}"]`);
    if (!activeTab) return;

    const images = activeTab.querySelectorAll(".carousel-items img");
    const prevButton = activeTab.querySelector(".previous");
    const nextButton = activeTab.querySelector(".next");

    if (!images.length || !prevButton || !nextButton) return;

    let index = 0; // Reset to first image for each tab

    function updateSlide() {
        images.forEach(img => img.classList.remove("active"));
        images[index].classList.add("active");
    }

    nextButton.addEventListener("click", () => {
        index = (index + 1) % images.length;
        updateSlide();
    });

    prevButton.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        updateSlide();
    });

    // Ensure the first image is shown when the tab is activated
    updateSlide();
}

// Initialize the first active tab's carousel on page load
const firstActiveTab = document.querySelector(".tab-item.active");
if (firstActiveTab) {
    initializeCarousel(firstActiveTab.dataset.content);
}


// For the testimonials area
let currentIndex = 0;
const totalCards = testimonialsCard.length;
console.log(totalCards)
// const cardWidth = 
// const visibleCards = 3;

function getCardWidth(){
    return testimonialsCard[0].offsetWidth + 45;
}


function getVisibleCards(){
    return window.innerWidth < 769 ? 1 : 3;
}

window.addEventListener("resize", () => {
    grid.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
});


nextReview.addEventListener("click", () => {
    if (currentIndex < totalCards - getVisibleCards()) {
      currentIndex++;
      grid.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
    }
  });
  
  prevReview.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      grid.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
    }
  });