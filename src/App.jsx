import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RecordCard from './components/RecordCard';
import FooterNav from './components/FooterNav';
import useCSV from './hooks/useCSV';
import useKeyboardNav from './hooks/useKeyboardNav';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recordStatuses, setRecordStatuses] = useState({});
  const [statusesLoaded, setStatusesLoaded] = useState(false);
  const { data, loading, error } = useCSV('/responses.csv');

  // Load decisions from localStorage on mount
  useEffect(() => {
    const loadStoredStatuses = () => {
      try {
        const savedStatuses = localStorage.getItem('applicationReviewStatuses');
        if (savedStatuses) {
          const parsedStatuses = JSON.parse(savedStatuses);
          console.log('Loaded review decisions from localStorage:', parsedStatuses);
          setRecordStatuses(parsedStatuses);
        } else {
          console.log('No stored review decisions found');
        }
      } catch (error) {
        console.warn('Failed to load review statuses from localStorage:', error);
        // Clear corrupted data
        localStorage.removeItem('applicationReviewStatuses');
      } finally {
        setStatusesLoaded(true);
      }
    };

    loadStoredStatuses();
  }, []);

  // Save decisions to localStorage whenever recordStatuses changes (but not on initial empty load)
  useEffect(() => {
    if (statusesLoaded) {
      try {
        localStorage.setItem('applicationReviewStatuses', JSON.stringify(recordStatuses));
        console.log('Saved review decisions to localStorage:', recordStatuses);
      } catch (error) {
        console.warn('Failed to save review statuses to localStorage:', error);
      }
    }
  }, [recordStatuses, statusesLoaded]);

  useKeyboardNav(currentIndex, setCurrentIndex, data?.length || 0);

  const goNext = () => {
    if (currentIndex < (data?.length || 0) - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleInterview = () => {
    setRecordStatuses(prev => ({
      ...prev,
      [currentIndex]: 'interview'
    }));
  };

  const handleReject = () => {
    setRecordStatuses(prev => ({
      ...prev,
      [currentIndex]: 'reject'
    }));
  };

  const clearStatus = () => {
    setRecordStatuses(prev => {
      const newStatuses = { ...prev };
      delete newStatuses[currentIndex];
      return newStatuses;
    });
  };

  const clearAllStatuses = () => {
    const reviewedCount = Object.keys(recordStatuses).length;
    if (reviewedCount > 0) {
      const confirmed = window.confirm(
        `Are you sure you want to clear all ${reviewedCount} review decisions? This action cannot be undone.`
      );
      if (confirmed) {
        setRecordStatuses({});
        localStorage.removeItem('applicationReviewStatuses');
        console.log('Cleared all review decisions');
      }
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (loading || !statusesLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 dark:text-gray-300 text-lg mb-2">
            {loading ? 'Loading CSV data...' : 'Restoring your review decisions...'}
          </div>
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400">Error loading CSV: {error}</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-300">No data found</div>
      </div>
    );
  }

  const currentRecord = data[currentIndex];
  const totalRecords = data.length;
  const currentStatus = recordStatuses[currentIndex];

  // Detect em dashes in current record (potential AI indicator)
  const hasEmDash = currentRecord && Object.values(currentRecord).some(value => 
    typeof value === 'string' && value.includes('—')
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-all duration-500`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        <Header 
          currentIndex={currentIndex}
          totalRecords={totalRecords}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          currentStatus={currentStatus}
          recordStatuses={recordStatuses}
          onClearAllStatuses={clearAllStatuses}
          hasEmDash={hasEmDash}
        />
        
        <main className="my-12">
          <RecordCard record={currentRecord} currentStatus={currentStatus} hasEmDash={hasEmDash} />
        </main>

        <FooterNav 
          currentIndex={currentIndex}
          totalRecords={totalRecords}
          onPrevious={goPrevious}
          onNext={goNext}
          currentStatus={currentStatus}
          onInterview={handleInterview}
          onReject={handleReject}
          onClearStatus={clearStatus}
        />

        {/* ARIA live region for screen readers */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Showing record {currentIndex + 1} of {totalRecords}
        </div>
      </div>
    </div>
  );
}

export default App; 