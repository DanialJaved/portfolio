// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-links a');
const indicator = document.createElement('div'); // Create the indicator element
indicator.classList.add('indicator');
document.querySelector('.nav-links').appendChild(indicator); // Append to the nav links

// Initialize indicator position
function setIndicatorPosition(link) {
  const linkRect = link.getBoundingClientRect();
  const navRect = document.querySelector('.nav-links').getBoundingClientRect();
  
  indicator.style.width = `${linkRect.width}px`; // Set the width of the indicator
  indicator.style.left = `${linkRect.left - navRect.left}px`; // Adjust the position based on the nav's position
}

// Add click event to each navigation link
navLinks.forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    // Update the indicator position
    setIndicatorPosition(this);
    
    // Smooth scroll with offset for fixed header
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const headerOffset = document.querySelector('header').offsetHeight; // Height of the fixed header
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY; // Position of the target element
    const offsetPosition = elementPosition - headerOffset; // Adjusted position

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth' // Smooth scrolling
    });
  });
});

// Set the indicator position on page load
window.addEventListener('load', () => {
  const activeLink = navLinks[0]; // Default to the first link
  setIndicatorPosition(activeLink);
});

// Intersection Observer for section animations
const sections = document.querySelectorAll('.section');
const options = {
  root: null,
  threshold: 0.2, // Trigger animation when 20% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id; // Get the ID of the section
      navLinks.forEach(link => {
        link.classList.remove('active'); // Remove active class from all links
        if (link.getAttribute('href').substring(1) === id) {
          link.classList.add('active'); // Add active class to the current link
          setIndicatorPosition(link); // Update indicator position
        }
      });
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});

// Sticky Header on Scroll
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinksContainer.classList.toggle('active'); // Toggle the active class for the navigation menu
});



// Back to Top Functionality
const backToTopButton = document.getElementById('backToTop');

// Show the button when the user scrolls down 100px
window.addEventListener('scroll', function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTopButton.classList.add('show'); // Add the show class to display the button
  } else {
    backToTopButton.classList.remove('show'); // Remove the show class to hide the button
  }
});

// Smooth scroll back to the top when the button is clicked
backToTopButton.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent default anchor click behavior
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scrolling
  });
});
