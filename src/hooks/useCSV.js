import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const useCSV = (csvPath) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCSV = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(csvPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
        }

        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => {
            // Clean up header names - remove extra whitespace and normalize
            return header.trim();
          },
          transform: (value) => {
            // Clean up values - remove extra whitespace
            return typeof value === 'string' ? value.trim() : value;
          },
          complete: (results) => {
            if (results.errors && results.errors.length > 0) {
              console.warn('CSV parsing warnings:', results.errors);
            }
            
            // Filter out completely empty rows
            const filteredData = results.data.filter(row => {
              return Object.values(row).some(value => 
                value !== null && value !== undefined && value !== ''
              );
            });

            setData(filteredData);
            setLoading(false);
          },
          error: (error) => {
            setError(`CSV parsing error: ${error.message}`);
            setLoading(false);
          }
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (csvPath) {
      loadCSV();
    }
  }, [csvPath]);

  return { data, loading, error };
};

export default useCSV; 