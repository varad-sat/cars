import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  BatteryCharging, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Sparkles, 
  Flame, 
  Layers, 
  Info,
  Car,
  FileText,
  Printer
} from 'lucide-react';

interface VehicleReportsProps {
  initialTab?: string;
  onReadArticle: (slug: string) => void;
}

export const VehicleReports: React.FC<VehicleReportsProps> = ({ 
  initialTab = 'pre-trip',
  onReadArticle
}) => {
  const [activeTab, setActiveTab] = useState<'pre-trip' | 'ev-battery' | 'charge-calc' | 'oil-interval'>(
    (initialTab as any) || 'pre-trip'
  );

  // --- STATE FOR 15-MIN PRE-TRIP CHECK (Post 2) ---
  const [tireFrontPsi, setTireFrontPsi] = useState<number>(34);
  const [tireRearPsi, setTireRearPsi] = useState<number>(34);
  const [targetPsi, setTargetPsi] = useState<number>(35);
  const [treadDepth, setTreadDepth] = useState<'good' | 'marginal' | 'unsafe'>('good');
  const [washerFluid, setWasherFluid] = useState<boolean>(true);
  const [coolantLevel, setCoolantLevel] = useState<boolean>(true);
  const [oilLevel, setOilLevel] = useState<boolean>(true);
  const [hasJumperCables, setHasJumperCables] = useState<boolean>(true);
  const [hasFlashlight, setHasFlashlight] = useState<boolean>(true);
  const [hasWater, setHasWater] = useState<boolean>(true);

  // Calculate Pre-Trip Score
  const calculatePreTripScore = () => {
    let score = 0;
    // Tires (max 30 pts)
    const psiDiffFront = Math.abs(tireFrontPsi - targetPsi);
    const psiDiffRear = Math.abs(tireRearPsi - targetPsi);
    if (psiDiffFront <= 2 && psiDiffRear <= 2) score += 20;
    else if (psiDiffFront <= 4 && psiDiffRear <= 4) score += 10;
    
    if (treadDepth === 'good') score += 10;
    else if (treadDepth === 'marginal') score += 5;

    // Fluids (max 40 pts)
    if (washerFluid) score += 10;
    if (coolantLevel) score += 15;
    if (oilLevel) score += 15;

    // Emergency Kit (max 30 pts)
    if (hasJumperCables) score += 10;
    if (hasFlashlight) score += 10;
    if (hasWater) score += 10;

    return score;
  };

  const preTripScore = calculatePreTripScore();

  // --- STATE FOR EV BATTERY HEALTH REPORT (Post 10) ---
  const [evModel, setEvModel] = useState<string>('Performance EV Sedan');
  const [evAgeYears, setEvAgeYears] = useState<number>(4);
  const [evMileage, setEvMileage] = useState<number>(48000);
  const [dcFastPercent, setDcFastPercent] = useState<number>(35);
  const [evClimate, setEvClimate] = useState<'temperate' | 'hot' | 'cold'>('temperate');
  const [originalRange, setOriginalRange] = useState<number>(315);

  // Calculate EV SoH (State of Health)
  const calculateEvSoH = () => {
    // Base degradation: ~1.5% per year
    let degradation = evAgeYears * 1.6;
    // Mileage degradation: ~0.8% per 15k miles
    degradation += (evMileage / 15000) * 0.8;
    // DC fast charging penalty
    if (dcFastPercent > 50) degradation += (dcFastPercent - 50) * 0.08;
    // Climate factor
    if (evClimate === 'hot') degradation += 2.2;
    if (evClimate === 'cold') degradation += 0.8;

    const calculatedSoH = Math.max(68, Math.min(99, Math.round((100 - degradation) * 10) / 10));
    return calculatedSoH;
  };

  const evSoH = calculateEvSoH();
  const estimatedRemainingRange = Math.round((originalRange * evSoH) / 100);

  // --- STATE FOR 800V VS 400V COMPARATOR (Post 3) ---
  const [batterySizeKwh, setBatterySizeKwh] = useState<number>(90);
  const [chargeWindow, setChargeWindow] = useState<'10to80' | '0to100'>('10to80');

  // Times in minutes for 10-80%
  const energyKwhNeeded = chargeWindow === '10to80' ? batterySizeKwh * 0.7 : batterySizeKwh;
  const time800vMin = Math.round((energyKwhNeeded / 330) * 60 + 2); // 800V average ~330kW ramp
  const time400vMin = Math.round((energyKwhNeeded / 120) * 60 + 6); // 400V average ~120kW ramp with thermal drop
  const timeSavedMin = Math.max(0, time400vMin - time800vMin);

  // --- STATE FOR MAINTENANCE MYTH CALCULATOR (Post 4) ---
  const [annualMiles, setAnnualMiles] = useState<number>(14000);
  const [oilType, setOilType] = useState<'synthetic' | 'mineral'>('synthetic');
  const [gasTypeChoice, setGasTypeChoice] = useState<'waste-premium' | 'spec-regular'>('waste-premium');

  // Computations for 3k miles vs 8.5k miles
  const oilChangesAt3k = Math.ceil(annualMiles / 3000);
  const oilChangesAt8k = Math.ceil(annualMiles / 8500);
  const costPerOilChange = 85;
  const oilDollarsSaved = (oilChangesAt3k - oilChangesAt8k) * costPerOilChange;
  const gallonsFuelBurned = annualMiles / 26; // 26 MPG average
  const premiumGasPenaltyDollars = gasTypeChoice === 'waste-premium' ? Math.round(gallonsFuelBurned * 0.75) : 0;
  const totalMythWaste = oilDollarsSaved + premiumGasPenaltyDollars;

  return (
    <div className="min-h-screen bg-[#0b0d11] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/80 text-red-400 text-xs font-mono-tech uppercase">
            <Wrench className="w-3.5 h-3.5" />
            <span>Interactive Automotive Benchmarks</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            VEHICLE DIAGNOSTICS & <span className="text-red-500">TELEMETRY SUITE</span>
          </h1>

          <p className="text-slate-300 max-w-3xl text-sm sm:text-base leading-relaxed">
            Data-backed calculators and real-time inspection tools built straight from our master technician dispatches. Audit your road trip readiness, evaluate second-hand EV battery degradation, compare 800V charging speeds, and calculate oil change savings.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('pre-trip')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'pre-trip'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>15-Min Pre-Trip Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('ev-battery')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'ev-battery'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <BatteryCharging className="w-4 h-4" />
            <span>Used EV Battery Health</span>
          </button>

          <button
            onClick={() => setActiveTab('charge-calc')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'charge-calc'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>800V vs 400V Charging Speed</span>
          </button>

          <button
            onClick={() => setActiveTab('oil-interval')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'oil-interval'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Maintenance Myth Savings</span>
          </button>
        </div>

        {/* TAB 1: 15-MIN PRE-TRIP AUDIT (Post 2) */}
        {activeTab === 'pre-trip' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6 bg-slate-900/80 p-6 sm:p-8 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-red-500" />
                  Pre-Highway 15-Minute Checklist
                </h2>
                <button
                  onClick={() => onReadArticle('how-to-prepare-your-car-for-a-long-road-trip')}
                  className="text-xs font-mono-tech text-red-400 hover:underline cursor-pointer"
                >
                  Read Post #2 Article →
                </button>
              </div>

              {/* 1. Tires & PSI */}
              <div className="space-y-4 pt-2">
                <div className="text-sm font-semibold text-slate-200 uppercase font-mono-tech flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-center text-xs leading-5 text-red-400 font-bold">1</span>
                  Tire Pressures & Tread Depth
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="text-xs text-slate-400 block mb-1">Target Door-Jamb PSI</label>
                    <input
                      type="number"
                      value={targetPsi}
                      onChange={(e) => setTargetPsi(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono-tech text-sm"
                    />
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="text-xs text-slate-400 block mb-1">Front Tires (Cold PSI)</label>
                    <input
                      type="number"
                      value={tireFrontPsi}
                      onChange={(e) => setTireFrontPsi(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono-tech text-sm"
                    />
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="text-xs text-slate-400 block mb-1">Rear Tires (Cold PSI)</label>
                    <input
                      type="number"
                      value={tireRearPsi}
                      onChange={(e) => setTireRearPsi(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono-tech text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400">Tread Depth Status</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setTreadDepth('good')}
                      className={`p-2 rounded-lg text-xs font-mono-tech border text-center transition-all ${
                        treadDepth === 'good'
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Safe (&gt;4/32")
                    </button>
                    <button
                      type="button"
                      onClick={() => setTreadDepth('marginal')}
                      className={`p-2 rounded-lg text-xs font-mono-tech border text-center transition-all ${
                        treadDepth === 'marginal'
                          ? 'bg-amber-950/60 border-amber-500 text-amber-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Marginal (3/32")
                    </button>
                    <button
                      type="button"
                      onClick={() => setTreadDepth('unsafe')}
                      className={`p-2 rounded-lg text-xs font-mono-tech border text-center transition-all ${
                        treadDepth === 'unsafe'
                          ? 'bg-red-950/60 border-red-500 text-red-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Danger (&lt;2/32")
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Fluid Inspections */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="text-sm font-semibold text-slate-200 uppercase font-mono-tech flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-center text-xs leading-5 text-red-400 font-bold">2</span>
                  Vital Engine Fluid Check
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-slate-950/70 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={washerFluid}
                      onChange={(e) => setWasherFluid(e.target.checked)}
                      className="w-4 h-4 accent-red-600 rounded"
                    />
                    <div className="text-xs sm:text-sm">
                      <span className="text-white font-medium">Windshield Washer Fluid:</span>{' '}
                      <span className="text-slate-400">Topped off with bug-remover or de-icer</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-slate-950/70 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={coolantLevel}
                      onChange={(e) => setCoolantLevel(e.target.checked)}
                      className="w-4 h-4 accent-red-600 rounded"
                    />
                    <div className="text-xs sm:text-sm">
                      <span className="text-white font-medium">Coolant Reservoir:</span>{' '}
                      <span className="text-slate-400">Between MIN/MAX lines, healthy color (no rust/sludge)</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-slate-950/70 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={oilLevel}
                      onChange={(e) => setOilLevel(e.target.checked)}
                      className="w-4 h-4 accent-red-600 rounded"
                    />
                    <div className="text-xs sm:text-sm">
                      <span className="text-white font-medium">Engine Oil Level (Dipstick):</span>{' '}
                      <span className="text-slate-400">Checked on level ground, within crosshatch hatch zone</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* 3. Emergency Kit */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="text-sm font-semibold text-slate-200 uppercase font-mono-tech flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-center text-xs leading-5 text-red-400 font-bold">3</span>
                  Emergency Trunk Pack Items
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className="flex items-center gap-2 p-2.5 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasJumperCables}
                      onChange={(e) => setHasJumperCables(e.target.checked)}
                      className="w-4 h-4 accent-red-600 rounded"
                    />
                    <span className="text-xs text-slate-200 font-medium">Jumper Cables</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasFlashlight}
                      onChange={(e) => setHasFlashlight(e.target.checked)}
                      className="w-4 h-4 accent-red-600 rounded"
                    />
                    <span className="text-xs text-slate-200 font-medium">High-Lumen Torch</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasWater}
                      onChange={(e) => setHasWater(e.target.checked)}
                      className="w-4 h-4 accent-red-600 rounded"
                    />
                    <span className="text-xs text-slate-200 font-medium">Emergency Water</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Score & Verdict Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider">Highway Readiness Rating</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono-tech text-xs">Post #2 Audit</span>
                </div>

                <div className="text-center py-4">
                  <div className={`text-6xl font-black font-heading ${
                    preTripScore >= 85 ? 'text-emerald-400' : preTripScore >= 65 ? 'text-amber-400' : 'text-red-500'
                  }`}>
                    {preTripScore}%
                  </div>
                  <div className="text-sm font-semibold font-mono-tech text-slate-300 mt-1 uppercase">
                    {preTripScore >= 85 ? 'GREEN: Ready For Interstate Touring' : preTripScore >= 65 ? 'YELLOW: Complete Check Before Departure' : 'RED: High Risk of Breakdown'}
                  </div>
                </div>

                <div className="space-y-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 text-xs">
                  <div className="font-semibold text-slate-300 font-mono-tech uppercase">Diagnostic Assessment:</div>
                  {preTripScore >= 85 ? (
                    <p className="text-slate-300 leading-relaxed">
                      Excellent! Tires are matched to door-jamb placard pressures, cooling capacity is verified, and trunk safety items prevent shoulder stranding.
                    </p>
                  ) : (
                    <p className="text-amber-300 leading-relaxed">
                      Caution required: Addressing tire pressure deviations or packing jumper cables will safeguard against sustained high-speed overheating.
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => window.print()}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono-tech font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4" /> Print Road-Trip Inspection Sheet
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USED EV BATTERY HEALTH REPORT (Post 10) */}
        {activeTab === 'ev-battery' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6 bg-slate-900/80 p-6 sm:p-8 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                  <BatteryCharging className="w-5 h-5 text-red-500" />
                  Second-Hand EV Battery Health (SoH) Estimator
                </h2>
                <button
                  onClick={() => onReadArticle('buying-used-what-to-look-for-in-a-second-hand-ev')}
                  className="text-xs font-mono-tech text-red-400 hover:underline cursor-pointer"
                >
                  Read Post #10 Article →
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Vehicle Classification</label>
                  <select
                    value={evModel}
                    onChange={(e) => setEvModel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm"
                  >
                    <option value="Performance EV Sedan">Performance EV Sedan (e.g. Model 3 Performance / Taycan)</option>
                    <option value="Long Range Compact Crossover">Long Range Compact Crossover (e.g. Ioniq 5 / Model Y)</option>
                    <option value="Urban Commuter Hatchback">Urban Commuter Hatchback (e.g. Bolt / Leaf / Mini EV)</option>
                    <option value="Full-Size Electric SUV">Full-Size Electric SUV / Truck</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Vehicle Age (Years): {evAgeYears} yrs</label>
                    <input
                      type="range"
                      min={1}
                      max={9}
                      value={evAgeYears}
                      onChange={(e) => setEvAgeYears(Number(e.target.value))}
                      className="w-full accent-red-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Odometer Mileage: {evMileage.toLocaleString()} mi</label>
                    <input
                      type="range"
                      min={5000}
                      max={120000}
                      step={2500}
                      value={evMileage}
                      onChange={(e) => setEvMileage(Number(e.target.value))}
                      className="w-full accent-red-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">DC Fast-Charging Share: {dcFastPercent}%</label>
                    <input
                      type="range"
                      min={5}
                      max={90}
                      step={5}
                      value={dcFastPercent}
                      onChange={(e) => setDcFastPercent(Number(e.target.value))}
                      className="w-full accent-red-600"
                    />
                    <span className="text-[10px] text-slate-500 font-mono-tech">Higher DC fast-charging increases thermal stress</span>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Primary Operating Climate</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setEvClimate('temperate')}
                        className={`p-2 rounded text-xs font-mono-tech border ${
                          evClimate === 'temperate' ? 'bg-red-600 text-white border-red-500 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Mild
                      </button>
                      <button
                        type="button"
                        onClick={() => setEvClimate('hot')}
                        className={`p-2 rounded text-xs font-mono-tech border ${
                          evClimate === 'hot' ? 'bg-red-600 text-white border-red-500 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Desert Heat
                      </button>
                      <button
                        type="button"
                        onClick={() => setEvClimate('cold')}
                        className={`p-2 rounded text-xs font-mono-tech border ${
                          evClimate === 'cold' ? 'bg-red-600 text-white border-red-500 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Freezing
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">OEM Factory Range When New (Miles)</label>
                  <input
                    type="number"
                    value={originalRange}
                    onChange={(e) => setOriginalRange(Number(e.target.value))}
                    className="w-full sm:w-48 bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono-tech text-sm"
                  />
                </div>
              </div>

              {/* Crucial Used EV Inspection Items from Post 10 */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <div className="text-xs font-mono-tech uppercase text-red-400 font-bold">
                  Post #10 Mandatory Pre-Purchase Inspection Points:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Check charging pins for arcing marks</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Query BMS OBD-2 cell millivolt delta</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Confirm 8yr/100k warranty transferability</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Verify latest vehicle firmware updates</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Estimated Health Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono-tech text-slate-400 uppercase">Battery State of Health</span>
                  <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30 font-mono-tech text-xs">
                    Degradation Model
                  </span>
                </div>

                <div className="text-center py-4">
                  <div className={`text-6xl font-black font-heading ${
                    evSoH >= 88 ? 'text-emerald-400' : evSoH >= 80 ? 'text-amber-400' : 'text-red-500'
                  }`}>
                    {evSoH}%
                  </div>
                  <div className="text-xs font-mono-tech text-slate-400 mt-1 uppercase">
                    ESTIMATED REMAINING CAPACITY
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono-tech text-center">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400">Current Real Range</div>
                    <div className="text-lg font-bold text-white mt-0.5">{estimatedRemainingRange} mi</div>
                    <div className="text-[10px] text-slate-500">vs {originalRange} mi new</div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400">BMS Health Verdict</div>
                    <div className="text-lg font-bold text-red-400 mt-0.5">
                      {evSoH >= 88 ? 'Prime Bargain' : evSoH >= 80 ? 'Fair Condition' : 'High Risk'}
                    </div>
                    <div className="text-[10px] text-slate-500">Based on Post 10 rules</div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  Because electric vehicles eliminate timing belts, head gaskets, and complex transmissions, an EV with &gt;88% SoH offers superior reliability compared to a combustion equivalent.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 800V VS 400V COMPARATOR (Post 3) */}
        {activeTab === 'charge-calc' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6 bg-slate-900/80 p-6 sm:p-8 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-red-500" />
                  800-Volt vs 400-Volt Architecture Simulator
                </h2>
                <button
                  onClick={() => onReadArticle('the-800-volt-architecture-changing-ev-charging')}
                  className="text-xs font-mono-tech text-red-400 hover:underline cursor-pointer"
                >
                  Read Post #3 Article →
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">
                    Battery Pack Size: <span className="text-red-400 font-bold font-mono-tech">{batterySizeKwh} kWh</span>
                  </label>
                  <input
                    type="range"
                    min={65}
                    max={120}
                    step={5}
                    value={batterySizeKwh}
                    onChange={(e) => setBatterySizeKwh(Number(e.target.value))}
                    className="w-full accent-red-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono-tech">
                    <span>65 kWh (Compact)</span>
                    <span>90 kWh (Performance AMG GT)</span>
                    <span>120 kWh (Heavy Hypercar)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono-tech text-slate-300 font-semibold uppercase">
                    Ohm's Law Physics Breakdown:
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Delivering 350 kW at 400V requires <span className="text-white font-mono-tech">875 Amperes</span> (immense thermal loss and bulky liquid-cooled cables). Doubling voltage to 800V cuts current to <span className="text-red-400 font-mono-tech font-bold">437 Amperes</span>, dropping wire heat (P = I²R) by four-fold!
                  </p>
                </div>
              </div>
            </div>

            {/* Side by side comparison cards */}
            <div className="lg:col-span-5 space-y-4">
              {/* 800V Card */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-950 border border-red-500/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tech text-red-400 font-bold uppercase">800V Next-Gen (AMG GT / Porsche)</span>
                  <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono-tech text-[10px] font-bold">FASTEST</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold font-heading text-white">{time800vMin}</span>
                  <span className="text-sm font-mono-tech text-slate-400">Minutes (10% → 80%)</span>
                </div>
                <div className="text-xs text-slate-300">
                  ⚡ Sustained 320kW+ charge curve, zero thermal throttling, coffee-break fast.
                </div>
              </div>

              {/* 400V Legacy Card */}
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 opacity-90">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tech text-slate-400 uppercase">400V Legacy Architecture</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono-tech text-[10px]">LEGACY</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold font-heading text-slate-400">{time400vMin}</span>
                  <span className="text-sm font-mono-tech text-slate-500">Minutes (10% → 80%)</span>
                </div>
                <div className="text-xs text-slate-400">
                  ⚠️ Heavy thermal dissipation forces current throttle down to 80-110kW after 35%.
                </div>
              </div>

              {/* Summary delta */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono-tech">
                <span className="text-xs text-slate-400">Time saved per highway charging stop:</span>
                <div className="text-2xl font-bold text-red-400 mt-1">-{timeSavedMin} Minutes Saved</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MAINTENANCE MYTH SAVINGS (Post 4) */}
        {activeTab === 'oil-interval' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6 bg-slate-900/80 p-6 sm:p-8 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-red-500" />
                  Oil Interval & Octane Myth Savings Calculator
                </h2>
                <button
                  onClick={() => onReadArticle('5-common-car-maintenance-myths-debunked')}
                  className="text-xs font-mono-tech text-red-400 hover:underline cursor-pointer"
                >
                  Read Post #4 Article →
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">
                    Annual Miles Driven: <span className="text-white font-mono-tech font-bold">{annualMiles.toLocaleString()} miles/year</span>
                  </label>
                  <input
                    type="range"
                    min={6000}
                    max={30000}
                    step={1000}
                    value={annualMiles}
                    onChange={(e) => setAnnualMiles(Number(e.target.value))}
                    className="w-full accent-red-600"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs font-mono-tech text-slate-300 font-semibold uppercase">
                    Myth 1: The 3,000-Mile Oil Change
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Modern Group IV/V synthetic motor oils withstand rigorous shear and oxidation for 7,500 to 10,000 miles. Changing at 3,000 miles is an outdated habit from 1965.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono-tech">
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-500 block">3k-Mile Routine:</span>
                      <span className="text-red-400 font-bold">{oilChangesAt3k} changes/yr</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-500 block">Synthetic Routine:</span>
                      <span className="text-emerald-400 font-bold">{oilChangesAt8k} changes/yr</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs font-mono-tech text-slate-300 font-semibold uppercase">
                    Myth 2: Premium 93 Octane Gives Regular Cars More Power
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Unless your car requires high octane, 93 octane offers zero power gain and only increases costs at the pump.
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setGasTypeChoice('waste-premium')}
                      className={`flex-1 p-2.5 rounded-lg text-xs font-mono-tech border ${
                        gasTypeChoice === 'waste-premium'
                          ? 'bg-red-950/60 border-red-500 text-red-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      Pumping Unnecessary Premium (+$0.75/gal)
                    </button>
                    <button
                      type="button"
                      onClick={() => setGasTypeChoice('spec-regular')}
                      className={`flex-1 p-2.5 rounded-lg text-xs font-mono-tech border ${
                        gasTypeChoice === 'spec-regular'
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      Using Manual-Spec Regular 87
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Scorecard */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono-tech text-slate-400 uppercase">Financial Impact</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-mono-tech text-xs">
                    Annual Waste Stopped
                  </span>
                </div>

                <div className="text-center py-4">
                  <div className="text-6xl font-black font-heading text-emerald-400">
                    ${totalMythWaste}
                  </div>
                  <div className="text-xs font-mono-tech text-slate-400 mt-1 uppercase">
                    ESTIMATED ANNUAL MONEY SAVED
                  </div>
                </div>

                <div className="space-y-2.5 font-mono-tech text-xs">
                  <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Oil Changes Avoided:</span>
                    <span className="text-white font-bold">{oilChangesAt3k - oilChangesAt8k} services (${oilDollarsSaved})</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Avoided Premium Gas Markup:</span>
                    <span className="text-white font-bold">${premiumGasPenaltyDollars} / year</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 italic">
                  "Always trust your owner's manual over old garage tales." — Post #4 Master Diagnostic Technician
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
