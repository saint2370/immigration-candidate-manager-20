import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface VisaUpdateCounterProps {
  type: string;
}

const VisaUpdatesCounter: React.FC<VisaUpdateCounterProps> = ({ type }) => {
  const [count, setCount] = useState<number>(0);
  
  useEffect(() => {
    // Check if we already have a count stored and when it was last updated
    const storedData = localStorage.getItem(`visa-count-${type}`);
    const now = new Date();
    const today = now.toDateString();
    
    if (storedData) {
      const { count, date } = JSON.parse(storedData);
      
      // If the stored date is today, use the stored count
      if (date === today) {
        setCount(count);
        return;
      }
    }
    
    // Otherwise, generate a new random count between 100 and 5000
    const newCount = Math.floor(Math.random() * 4901) + 100; // 100 to 5000
    setCount(newCount);
    
    // Store the new count and today's date
    localStorage.setItem(`visa-count-${type}`, JSON.stringify({
      count: newCount,
      date: today
    }));
    
  }, [type]);

  return (
    <div className="flex items-center text-green-600">
      <span className="font-medium">Plus de {count} délivrés aujourd'hui</span>
      <ArrowUp size={16} className="ml-1" />
    </div>
  );
};

export default VisaUpdatesCounter;
