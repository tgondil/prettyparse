import React, { memo } from 'react';

const Header = memo(({ currentIndex, totalRecords, darkMode, onToggleDarkMode, currentStatus, recordStatuses, onClearAllStatuses, hasEmDash }) => {
  const progress = totalRecords > 0 ? ((currentIndex + 1) / totalRecords) * 100 : 0;
  
  // Calculate review statistics
  const interviewCount = Object.values(recordStatuses).filter(status => status === 'interview').length;
  const rejectCount = Object.values(recordStatuses).filter(status => status === 'reject').length;
  const reviewedCount = interviewCount + rejectCount;

  return (
    <header className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 transition-all duration-300 hover:shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Application Review
          </h1>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Navigate through applications with ease • Decisions saved automatically
              {reviewedCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  {reviewedCount} reviewed
                </span>
              )}
            </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {reviewedCount > 0 && (
            <button
              onClick={onClearAllStatuses}
              className="group relative p-3 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 hover:from-red-100 hover:to-orange-100 dark:hover:from-red-800/40 dark:hover:to-orange-800/40 border border-red-200 dark:border-red-700 transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:outline-none transform hover:scale-105"
              aria-label="Clear all review decisions"
              title="Clear all review decisions"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 relative z-10 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}

          <button
            onClick={onToggleDarkMode}
            className="group relative p-3 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-600 dark:hover:to-gray-700 border border-blue-200 dark:border-gray-600 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transform hover:scale-105"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {darkMode ? (
            <svg className="w-6 h-6 text-yellow-500 relative z-10 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-slate-600 relative z-10 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-gray-700 px-3 py-2 rounded-full text-center">
            Record {currentIndex + 1} of {totalRecords}
          </span>
          <span className="font-medium text-gray-700 dark:text-gray-300 bg-purple-50 dark:bg-gray-700 px-3 py-2 rounded-full text-center">
            {Math.round(progress)}% complete
          </span>
          <span className="font-medium text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/30 px-3 py-2 rounded-full text-center">
            ✓ {interviewCount} Interview
          </span>
          <span className="font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/30 px-3 py-2 rounded-full text-center">
            ✗ {rejectCount} Reject
          </span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {currentStatus && (
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              currentStatus === 'interview' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
            }`}>
              {currentStatus === 'interview' ? '✓ Marked for Interview' : '✗ Marked as Rejected'}
            </span>
          )}
          
          {hasEmDash && (
            <span className="inline-flex items-center px-3 py-2 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border border-orange-200 dark:border-orange-700">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              AI Detected
            </span>
          )}
        </div>
        
        <div className="relative">
          <div className="w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full h-3 shadow-inner">
            <div 
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out shadow-lg relative overflow-hidden"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={currentIndex + 1}
              aria-valuemin={1}
              aria-valuemax={totalRecords}
              aria-label={`Progress: ${currentIndex + 1} of ${totalRecords} records`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
Header.displayName = 'Header'; 