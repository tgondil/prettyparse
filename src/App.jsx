import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

  // All hooks must be called before any early returns
  useKeyboardNav(currentIndex, setCurrentIndex, data?.length || 0);

  // Memoized calculations to prevent unnecessary recalculations
  const currentRecord = useMemo(() => data?.[currentIndex], [data, currentIndex]);
  const totalRecords = useMemo(() => data?.length || 0, [data]);
  const currentStatus = useMemo(() => recordStatuses[currentIndex], [recordStatuses, currentIndex]);

  // Detect em dashes in current record (potential AI indicator) - memoized for performance
  const hasEmDash = useMemo(() => 
    currentRecord && Object.values(currentRecord).some(value => 
      typeof value === 'string' && value.includes('—')
    ), [currentRecord]);

  // Memoized handlers to prevent unnecessary re-renders
  const goNext = useCallback(() => {
    if (currentIndex < (data?.length || 0) - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, data?.length]);

  const goPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const handleInterview = useCallback(() => {
    setRecordStatuses(prev => ({
      ...prev,
      [currentIndex]: 'interview'
    }));
  }, [currentIndex]);

  const handleReject = useCallback(() => {
    setRecordStatuses(prev => ({
      ...prev,
      [currentIndex]: 'reject'
    }));
  }, [currentIndex]);

  const clearStatus = useCallback(() => {
    setRecordStatuses(prev => {
      const newStatuses = { ...prev };
      delete newStatuses[currentIndex];
      return newStatuses;
    });
  }, [currentIndex]);

  const clearAllStatuses = useCallback(() => {
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
  }, [recordStatuses]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (loading || !statusesLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 flex items-center justify-center animate-fade-in">
        <div className="text-center animate-slide-up">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl animate-gentle-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="text-gray-700 dark:text-gray-200 text-xl font-semibold mb-3">
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

  return (
          <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-all duration-300`}>
      {/* Optimized animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/8 to-blue-400/8 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/5 to-pink-400/5 rounded-full blur-3xl animate-slow-spin"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl animate-fade-in">
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
          <div key={currentIndex} className="animate-slide-up">
            <RecordCard record={currentRecord} currentStatus={currentStatus} hasEmDash={hasEmDash} />
          </div>
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