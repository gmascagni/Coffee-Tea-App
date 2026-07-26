import React, { useState } from 'react';
import { HelpCircle, Droplet, Gauge, Flame, AlertCircle, ChevronRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { TROUBLESHOOTING_GUIDE } from '../data/brewData';

export default function TroubleshootingHub({ trackMode }) {
  const isCoffee = trackMode === 'coffee';
  const guides = TROUBLESHOOTING_GUIDE[trackMode] || TROUBLESHOOTING_GUIDE.coffee;
  const [selectedSymptomId, setSelectedSymptomId] = useState(guides[0]?.id || 'sour');

  const selectedGuide = guides.find((g) => g.id === selectedSymptomId) || guides[0];

  const GRIND_MATRIX = [
    { level: 'Extra Fine', range: '200 - 300 µm', idealFor: 'Espresso / Turkish Coffee', visual: 'Powder / Flour-like texture' },
    { level: 'Fine / Medium-Fine', range: '400 - 550 µm', idealFor: 'Pour-Over (V60) / AeroPress', visual: 'Table salt texture' },
    { level: 'Medium', range: '600 - 750 µm', idealFor: 'Automatic Drip Coffee Maker / Flat Drippers', visual: 'Regular beach sand texture' },
    { level: 'Medium-Coarse', range: '750 - 900 µm', idealFor: 'Chemex / Clever Dripper', visual: 'Rough sand / Kosher salt' },
    { level: 'Coarse', range: '900 - 1100 µm', idealFor: 'French Press / Cold Brew', visual: 'Coarse sea salt / Breadcrumb' }
  ];

  return (
    <section className="mt-12 p-7 md:p-9 rounded-3xl glass-panel shadow-2xl transition-all duration-500">
      
      {/* Section Header */}
      <div className="mb-8 pb-4 border-b border-white/10">
        <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-widest text-amber-gold mb-1.5">
          <HelpCircle className="w-4 h-4" />
          <span>{isCoffee ? 'Coffee Extraction Diagnostics' : 'Tea Steeping Diagnostics'}</span>
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-cream-light drop-shadow-md">
          {isCoffee ? 'Home Coffee Extraction Diagnostics & Variable Control' : 'Fine Tea Steeping Diagnostics & Leaf Variable Control'}
        </h3>
        <p className="text-xs md:text-sm text-cream-soft/70 mt-1">
          {isCoffee 
            ? 'Identify coffee brew defects (sourness, bitterness, astringency) and adjust grind size, water quality, and temperature.' 
            : 'Identify tea steeping defects (scalding, harshness, grassy notes) and adjust water temp, steep time, and leaf ratio.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Interactive Extraction Symptom Diagnostics */}
        <div>
          <h4 className="text-sm uppercase tracking-wider font-extrabold text-cream-light mb-4 flex items-center gap-2 drop-shadow">
            <AlertCircle className="w-4 h-4 text-amber-gold" />
            <span>Interactive {isCoffee ? 'Coffee' : 'Tea'} Taste Diagnostics:</span>
          </h4>

          {/* Symptom Picker Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {guides.map((item) => {
              const isSelected = item.id === selectedGuide?.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSymptomId(item.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-0.5 ${
                    isSelected
                      ? isCoffee 
                        ? 'btn-tactile-amber text-espresso-950 font-extrabold scale-105'
                        : 'btn-tactile-sage text-cream-light font-extrabold scale-105'
                      : 'bg-espresso-900/70 border-white/10 text-cream-soft hover:bg-white/10 hover:border-white/20 shadow-md'
                  }`}
                >
                  <div className="text-xs font-bold mb-1 flex items-center justify-between">
                    <span>{item.symptom}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Diagnosis Result 3D Card */}
          {selectedGuide && (
            <div className="p-6 rounded-3xl bg-espresso-950/95 border border-amber-gold/40 shadow-2xl">
              <div className="text-xs font-extrabold text-amber-gold uppercase tracking-wider mb-2">
                Root Cause Analysis:
              </div>
              <p className="text-sm font-bold text-cream-light mb-5 leading-relaxed drop-shadow">
                {selectedGuide.cause}
              </p>

              <div className="text-xs font-extrabold text-cream-soft/70 uppercase tracking-wider mb-3">
                Actionable Home Remedies:
              </div>
              <div className="space-y-2.5">
                {selectedGuide.remedies.map((remedy, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-cream-soft font-medium flex items-start gap-3 shadow-inner">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{remedy}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Burr Grinder Settings Visualizer & Water Filtration */}
        <div className="space-y-6">
          
          {/* Burr Grinder Visual Settings Card */}
          <div className="p-6 rounded-3xl bg-espresso-900/70 border border-white/15 shadow-2xl">
            <h4 className="text-sm uppercase tracking-wider font-extrabold text-cream-light mb-4 flex items-center gap-2 drop-shadow">
              <Gauge className="w-4 h-4 text-amber-gold" />
              <span>Burr Grinder Setting & Micron Guide</span>
            </h4>

            <div className="space-y-2.5 text-xs">
              {GRIND_MATRIX.map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between shadow-inner">
                  <div>
                    <div className="font-extrabold text-cream-light">{item.level}</div>
                    <div className="text-[11px] text-cream-soft/60 font-medium">{item.visual}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-amber-gold font-extrabold">{item.range}</div>
                    <div className="text-[10px] text-cream-soft/50 font-medium">{item.idealFor}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Water Quality & Filter Card */}
          <div className="p-6 rounded-3xl bg-espresso-900/70 border border-white/15 shadow-2xl">
            <h4 className="text-sm uppercase tracking-wider font-extrabold text-cream-light mb-2 flex items-center gap-2 drop-shadow">
              <Droplet className="w-4 h-4 text-cyan-400" />
              <span>Water Chemistry & Filtration at Home</span>
            </h4>
            <p className="text-xs text-cream-soft/80 font-medium leading-relaxed">
              Water accounts for 98.5% of your brewed cup. Standard tap water with high calcium/scale mutes acidity, while pure distilled zero-TDS water yields flat, sour notes.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
                <span className="text-cream-soft/60 block text-[10px] font-extrabold">TARGET TDS</span>
                <span className="text-amber-gold font-extrabold text-sm">120 - 150 ppm</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
                <span className="text-cream-soft/60 block text-[10px] font-extrabold">OPTIMAL PH</span>
                <span className="text-emerald-400 font-extrabold text-sm">6.5 - 7.5 pH</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
