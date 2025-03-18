
import React, { useEffect, useState } from 'react';
import { PartyPopper, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ApprovalCelebrationProps {
  isVisible: boolean;
  onComplete: () => void;
  candidateInfo?: {
    name?: string;
    flightDate?: string;
    destination?: string;
    jobTitle?: string;
    salary?: string;
  };
}

export const ApprovalCelebration = ({ isVisible, onComplete, candidateInfo }: ApprovalCelebrationProps) => {
  const [countdown, setCountdown] = useState(60);
  
  useEffect(() => {
    if (!isVisible) return;
    
    // Initialize countdown
    setCountdown(60);
    
    // Launch confetti
    const launchConfetti = () => {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      
      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }
        
        // Launch multiple confetti from different positions
        confetti({
          particleCount: 3,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.1, 0.3) },
          colors: ['#ff0000', '#ffffff', '#ff0000'],
        });
        
        confetti({
          particleCount: 3,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.1, 0.3) },
          colors: ['#ff0000', '#ffffff', '#ff0000'],
        });
      }, 250);
    };
    
    // Launch initial confetti
    launchConfetti();
    
    // Set interval for confetti bursts
    const confettiInterval = setInterval(() => {
      launchConfetti();
    }, 3000);
    
    // Set countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          clearInterval(confettiInterval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Clean up on unmount
    return () => {
      clearInterval(timer);
      clearInterval(confettiInterval);
    };
  }, [isVisible, onComplete]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center flex-col bg-black/70 backdrop-blur-sm">
      <div className="text-center animate-bounce">
        <div className="text-8xl font-bold text-red-600 drop-shadow-[0_0_30px_rgba(255,0,0,0.8)]">BOOM !!</div>
        <div className="text-4xl font-bold text-white mt-4 animate-pulse">Visa Approuvé !</div>
      </div>
      
      {/* Sparkling effects */}
      <div className="absolute top-1/4 left-1/4 animate-ping">
        <Sparkles size={48} className="text-yellow-400" />
      </div>
      <div className="absolute top-1/3 right-1/3 animate-ping delay-300">
        <Star size={48} className="text-yellow-400 fill-yellow-400" />
      </div>
      <div className="absolute bottom-1/3 right-1/4 animate-ping delay-500">
        <Sparkles size={48} className="text-yellow-400" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 animate-ping delay-700">
        <PartyPopper size={48} className="text-red-400" />
      </div>
      
      {/* Additional information card */}
      {candidateInfo && (
        <div className="bg-white rounded-lg shadow-2xl p-6 mt-12 max-w-md mx-auto animate-fade-in">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Félicitations! Vos informations de voyage:</h3>
          
          <div className="space-y-3">
            {candidateInfo.destination && (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <span className="text-red-600 text-lg">✈️</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-medium">{candidateInfo.destination}</p>
                </div>
              </div>
            )}
            
            {candidateInfo.flightDate && (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <span className="text-red-600 text-lg">🗓️</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date de vol</p>
                  <p className="font-medium">{candidateInfo.flightDate}</p>
                </div>
              </div>
            )}
            
            {candidateInfo.jobTitle && (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <span className="text-red-600 text-lg">💼</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Emploi</p>
                  <p className="font-medium">{candidateInfo.jobTitle}</p>
                </div>
              </div>
            )}
            
            {candidateInfo.salary && (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <span className="text-red-600 text-lg">💰</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Salaire</p>
                  <p className="font-medium">{candidateInfo.salary}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="absolute bottom-6 left-0 right-0 text-center text-white">
        Cette fenêtre se fermera dans <span className="font-bold">{countdown}</span> secondes
      </div>
    </div>
  );
};

export default ApprovalCelebration;
