function fadeInOutImages() {
  const images = document.querySelectorAll('.fade-image');
  let currentIndex = 0;
  const intervalTime = 3000; // 3 seconds

  function fadeOutImage() {
    images[currentIndex].style.opacity = '0';
  }

  function fadeInNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].style.opacity = '1';
  }

  function loopImages() {
    // fadeInNextImage()
    setTimeout(fadeInNextImage, 100); // Fade in after 1 second (adjust as needed)
    fadeOutImage();
  }

  // Initially, show the first image
  images[0].style.opacity = '1';

  // Set an interval to loop through images
  setInterval(loopImages, intervalTime);
}

// Call the function when the page loads
window.onload = fadeInOutImages;
