import { useEffect, useState } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      
      // Verwijder na fade-out animatie
      const removeTimer = setTimeout(() => {
        const element = document.getElementById('loading-screen');
        if (element && element.parentNode) {
          element.style.display = 'none';
        }
      }, 1000); // Match de CSS transition tijd
      
      return () => clearTimeout(removeTimer);
    }, 3000); // 3 seconden

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      id="loading-screen" 
      className={`loading-screen ${!isVisible ? 'fade-out' : ''}`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease'
      }}
    >
      <div className="loading-content">
        <h1 className="loading-title">
          Krishna Bihari
        </h1>
        <div className="loading-divider"></div>
        <p className="loading-quote">
          Blending Code, Art & Culture
        </p>
      </div>
    </div>
  );
}
