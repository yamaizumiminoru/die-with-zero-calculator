import React, { useState, useEffect } from 'react';
import InputSection from './components/InputSection';
import ResultSection from './components/ResultSection';
import AssetChart from './components/AssetChart';
import { calculateRequiredAssets } from './utils/calculator';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({
    dieAge: 92,
    retireAge: 60,
    monthlyExpenses: 25,
    annualYield: 4.0,
    pensionStartAge: 65,
    pensionMonthly: 15,
    lumpSumBuffer: 300
  });

  const [result, setResult] = useState({
    totalRequired: 0,
    simulation: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  useEffect(() => {
    const res = calculateRequiredAssets(inputs);
    setResult(res);
  }, [inputs]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Die With Zero Calculator</h1>
        <p className="subtitle">Plan your perfect exit.</p>
      </header>

      <main className="app-content">
        <div className="left-panel">
          <InputSection inputs={inputs} handleChange={handleChange} />
        </div>

        <div className="right-panel">
          <ResultSection totalRequired={result.totalRequired} />
          <AssetChart data={result.simulation} dieAge={inputs.dieAge} />
        </div>
      </main>
    </div>
  );
}

export default App;
