import React, { useState } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import PrecisionCalculator from './components/PrecisionCalculator';
import MultiPhaseTimer from './components/MultiPhaseTimer';
import MasterclassHub from './components/MasterclassHub';
import TroubleshootingHub from './components/TroubleshootingHub';
import { BREW_METHODS, MASTERCLASSES } from './data/brewData';

export default function App() {
  // Main Application State
  const [trackMode, setTrackMode] = useState('coffee'); // 'coffee' | 'tea'
  const [unitSystem, setUnitSystem] = useState('metric'); // 'metric' | 'imperial'
  const [isMuted, setIsMuted] = useState(false);

  // Active Method & Scaling State
  const methods = BREW_METHODS[trackMode] || BREW_METHODS.coffee;
  const [activeMethod, setActiveMethod] = useState(methods[0]);
  const [cupCount, setCupCount] = useState(2);
  const [cupMl, setCupMl] = useState(240);
  const [customRatio, setCustomRatio] = useState(null);

  // Masterclass & Split Screen State
  const [isSplitScreen, setIsSplitScreen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(MASTERCLASSES[0]);

  // Sync active method when track mode switches
  const handleTrackSwitch = (newTrack) => {
    setTrackMode(newTrack);
    const newMethods = BREW_METHODS[newTrack];
    setActiveMethod(newMethods[0]);
    setCustomRatio(null);
  };

  const isCoffee = trackMode === 'coffee';

  // Math for dry dose calculation
  const totalWaterMl = cupCount * cupMl;
  const ratio = customRatio || activeMethod.ratio;
  const dryDoseGrams = totalWaterMl / ratio;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isCoffee ? 'bg-espresso-950 text-cream-soft' : 'bg-slate-950 text-cream-soft'
    }`}>
      
      {/* 1. Header Bar */}
      <Header
        trackMode={trackMode}
        setTrackMode={handleTrackSwitch}
        unitSystem={unitSystem}
        setUnitSystem={setUnitSystem}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Main Workspace Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        
        {/* 2. Hero Editorial Banner */}
        <HeroBanner
          trackMode={trackMode}
          activeMethod={activeMethod}
          unitSystem={unitSystem}
        />

        {/* 3. Core Calculator & Multi-Phase Timer Layout */}
        <div className={`grid grid-cols-1 ${isSplitScreen ? 'lg:grid-cols-12 gap-6' : 'lg:grid-cols-2 gap-8'}`}>
          
          {/* Left Pane: Precision Ratio & Cup Scaling Calculator */}
          <div className={isSplitScreen ? 'lg:col-span-5' : ''}>
            <PrecisionCalculator
              trackMode={trackMode}
              methods={methods}
              activeMethod={activeMethod}
              setActiveMethod={setActiveMethod}
              cupCount={cupCount}
              setCupCount={setCupCount}
              cupMl={cupMl}
              setCupMl={setCupMl}
              customRatio={customRatio}
              setCustomRatio={setCustomRatio}
              unitSystem={unitSystem}
            />
          </div>

          {/* Right Pane: Multi-Phase Countdown Timer */}
          <div className={isSplitScreen ? 'lg:col-span-7' : ''}>
            <MultiPhaseTimer
              trackMode={trackMode}
              activeMethod={activeMethod}
              dryDoseGrams={dryDoseGrams}
              isMuted={isMuted}
            />
          </div>

        </div>

        {/* 4. Integrated Masterclass Video Hub & Split Screen */}
        <MasterclassHub
          trackMode={trackMode}
          isSplitScreen={isSplitScreen}
          setIsSplitScreen={setIsSplitScreen}
          activeVideo={activeVideo}
          setActiveVideo={setActiveVideo}
        />

        {/* 5. Extraction Nuance & Troubleshooting Hub */}
        <TroubleshootingHub trackMode={trackMode} />

      </main>

      {/* App Footer */}
      <footer className="mt-16 border-t border-white/10 py-8 px-4 text-center text-xs text-cream-soft/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-serif font-bold text-cream-light text-sm">BrewCraft: The Art of Extraction</span>
            <p className="mt-0.5">Precision Specialty Coffee & Fine Tea Brewing Application</p>
          </div>
          <div className="text-cream-soft/40">
            Designed for Home Brewing Excellence • Metric & Imperial Support
          </div>
        </div>
      </footer>

    </div>
  );
}
