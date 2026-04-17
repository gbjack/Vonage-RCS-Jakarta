// src/scripts/gsap-loader.js
let gsapLoaded = false;
let pendingCallbacks = [];

function loadGSAP(callback) {
  if (gsapLoaded && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    callback();
    return;
  }
  
  pendingCallbacks.push(callback);
  
  if (document.querySelector('script[src*="gsap"]')) {
    return;
  }
  
  const gsapScript = document.createElement('script');
  gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
  gsapScript.onload = () => {
    const scrollScript = document.createElement('script');
    scrollScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
    scrollScript.onload = () => {
      gsapLoaded = true;
      gsap.registerPlugin(ScrollTrigger);
      pendingCallbacks.forEach(cb => cb());
      pendingCallbacks = [];
    };
    document.head.appendChild(scrollScript);
  };
  document.head.appendChild(gsapScript);
}

window.loadGSAP = loadGSAP;