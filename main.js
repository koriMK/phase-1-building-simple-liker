// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Get the error modal element
  const errorModal = document.getElementById('modal');
  
  // Add click event listeners to all empty hearts
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('like-glyph')) {
      const heart = event.target;
      
      // Check if heart is empty or full
      if (heart.textContent === EMPTY_HEART) {
        // Server call for empty heart
        mimicServerCall()
          .then(() => {
            // Success - change to full heart
            heart.textContent = FULL_HEART;
            heart.classList.add('activated-heart');
          })
          .catch((error) => {
            // Failure - show error modal
            errorModal.classList.remove('hidden');
            errorModal.textContent = error;
            
            // Hide modal after 3 seconds
            setTimeout(() => {
              errorModal.classList.add('hidden');
            }, 3000);
          });
      } else {
        // Click on full heart - revert without server call
        heart.textContent = EMPTY_HEART;
        heart.classList.remove('activated-heart');
      }
    }
  });
});