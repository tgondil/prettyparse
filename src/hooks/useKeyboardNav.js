import { useEffect } from 'react';

const useKeyboardNav = (currentIndex, setCurrentIndex, totalRecords) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Only handle keyboard navigation when not in an input field
      if (
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA' ||
        event.target.contentEditable === 'true'
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
          }
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (currentIndex < totalRecords - 1) {
            setCurrentIndex(currentIndex + 1);
          }
          break;
        default:
          break;
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, setCurrentIndex, totalRecords]);
};

export default useKeyboardNav; 