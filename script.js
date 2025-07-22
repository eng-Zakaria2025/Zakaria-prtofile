// Optimized JavaScript for portfolio website
(function() {
  'use strict';
  
  // Cache DOM elements
  const elements = {};
  
  function showMessage() {
    // Use a more elegant notification instead of alert
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 1em 2em;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
      max-width: 300px;
      text-align: center;
    `;
    notification.textContent = 'مرحبًا! شكرًا لزيارة موقعي الشخصي';
    
    // Add animation styles
    if (!document.getElementById('notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
  
  // Performance optimizations
  function optimizeImages() {
    const img = document.querySelector('.about img');
    if (img) {
      // Set loading attribute for browsers that support it
      img.loading = 'lazy';
      
      // Add error handling for image loading
      img.onerror = function() {
        console.warn('Image failed to load:', this.src);
        this.style.display = 'none';
      };
      
      // Add loading animation
      img.onload = function() {
        this.classList.add('loading');
      };
    }
  }
  
  // Initialize when DOM is ready
  function init() {
    // Cache frequently accessed elements
    elements.button = document.querySelector('button');
    elements.sections = document.querySelectorAll('section');
    
    // Setup optimizations
    optimizeImages();
    
    // Add loading animations to sections
    elements.sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('loading');
      }, index * 100);
    });
    
    // Expose showMessage function globally
    window.showMessage = showMessage;
  }
  
  // Use efficient event listener
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Performance monitoring (for development)
  if (window.performance && window.performance.mark) {
    window.performance.mark('script-end');
  }
  
})();