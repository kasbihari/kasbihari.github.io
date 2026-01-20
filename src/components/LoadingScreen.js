export function initLoadingScreen() {
  // Controleer of de loading screen bestaat
  const loadingScreen = document.getElementById('loading-screen');
  
  if (loadingScreen) {
    // Forceer dat het scherm zichtbaar is
    loadingScreen.style.display = 'flex';
    loadingScreen.style.opacity = '1';
    
    // Verberg na 3 seconden
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.pointerEvents = 'none';
      
      // Verwijder na de overgang
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 1000);
    }, 3000);
  }
}
