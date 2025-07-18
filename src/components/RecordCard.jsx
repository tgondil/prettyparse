import React, { useEffect, useRef } from 'react';

const RecordCard = ({ record, currentStatus }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    // Smoothly scroll content to top on record change
    if (cardRef.current) {
      cardRef.current.scrollTop = 0;
    }
  }, [record]);

  if (!record) {
    return (
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
        <div className="text-gray-500 dark:text-gray-400 text-center">No record to display</div>
      </section>
    );
  }

  const entries = Object.entries(record).filter(([key, value]) => 
    value !== null && value !== undefined && value !== ''
  );

  return (
    <section className={`bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 rounded-3xl shadow-2xl max-w-3xl mx-auto transition-all duration-300 hover:shadow-3xl hover:scale-[1.01] ${
      currentStatus === 'interview' 
        ? 'border-2 border-green-300 dark:border-green-600' 
        : currentStatus === 'reject' 
        ? 'border-2 border-red-300 dark:border-red-600'
        : 'border border-gray-200 dark:border-gray-700'
    }`}>
      <div 
        ref={cardRef}
        className="max-h-96 overflow-y-auto p-8 space-y-1"
        tabIndex={0}
        role="region"
        aria-label="Record details"
      >
        {entries.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No data available for this record</p>
          </div>
        ) : (
          <div className="space-y-1">
            {entries.map(([key, value], index) => (
              <div 
                key={index}
                className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 rounded-xl transition-all duration-200 p-4 border border-transparent hover:border-blue-200 dark:hover:border-gray-600"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  <div className="lg:col-span-1">
                    <div className="inline-flex items-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 opacity-60 group-hover:opacity-100 transition-opacity duration-200"></div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm break-words group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="text-gray-700 dark:text-gray-300 break-words whitespace-pre-wrap bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 border border-gray-100 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-gray-600 transition-all duration-200">
                      {String(value)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecordCard; 