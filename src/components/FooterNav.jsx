import React, { memo } from 'react';

const FooterNav = memo(({ currentIndex, totalRecords, onPrevious, onNext, currentStatus, onInterview, onReject, onClearStatus }) => {
  const isFirstRecord = currentIndex === 0;
  const isLastRecord = currentIndex === totalRecords - 1;

  const handlePrevious = () => {
    if (!isFirstRecord) {
      onPrevious();
    }
  };

  const handleNext = () => {
    if (!isLastRecord) {
      onNext();
    }
  };

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <footer className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 max-w-3xl mx-auto transition-all duration-300 hover:shadow-2xl">
      {/* Review Action Buttons */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          onClick={onInterview}
          className={`group relative overflow-hidden flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:outline-none transform hover:scale-105 ${
            currentStatus === 'interview'
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg ring-2 ring-green-300'
              : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="relative z-10">Interview</span>
        </button>

        <button
          onClick={onReject}
          className={`group relative overflow-hidden flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:outline-none transform hover:scale-105 ${
            currentStatus === 'reject'
              ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg ring-2 ring-red-300'
              : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="relative z-10">Reject</span>
        </button>

        {currentStatus && (
          <button
            onClick={onClearStatus}
            className="group relative overflow-hidden flex items-center space-x-2 px-6 py-4 rounded-xl font-medium bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white transition-all duration-300 focus:ring-2 focus:ring-gray-400 focus:outline-none transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="relative z-10">Clear</span>
          </button>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          onKeyDown={(e) => handleKeyDown(e, handlePrevious)}
          disabled={isFirstRecord}
          aria-disabled={isFirstRecord}
          className={`group relative overflow-hidden flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transform hover:scale-105 ${
            isFirstRecord 
              ? 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-sm' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {!isFirstRecord && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
          <svg className={`w-5 h-5 transition-transform duration-300 ${!isFirstRecord ? 'group-hover:-translate-x-1' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="relative z-10">Previous</span>
        </button>

        <div className="text-center px-6">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 px-4 py-2 rounded-full border border-blue-200 dark:border-gray-600">
            <svg className="w-4 h-4 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Use arrow keys
            </span>
            <svg className="w-4 h-4 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <button
          onClick={handleNext}
          onKeyDown={(e) => handleKeyDown(e, handleNext)}
          disabled={isLastRecord}
          aria-disabled={isLastRecord}
          className={`group relative overflow-hidden flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transform hover:scale-105 ${
            isLastRecord 
              ? 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-sm' 
              : 'bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {!isLastRecord && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
          <span className="relative z-10">Next</span>
          <svg className={`w-5 h-5 transition-transform duration-300 ${!isLastRecord ? 'group-hover:translate-x-1' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </footer>
  );
});

export default FooterNav;
FooterNav.displayName = 'FooterNav'; 