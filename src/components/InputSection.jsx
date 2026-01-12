import React from 'react';

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange, type = "number", unit, step = "1", min = "0" }) => (
    <div className="input-group">
        <label htmlFor={name}>{label}</label>
        <div className="input-wrapper">
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                step={step}
                min={min}
            />
            {unit && <span className="unit">{unit}</span>}
        </div>
    </div>
);

const InputSection = ({ inputs, handleChange }) => {
    return (
        <div className="input-section glass-panel">
            <h2>Parameters</h2>
            <div className="inputs-grid">
                <InputField
                    label="Die at (Age)"
                    name="dieAge"
                    value={inputs.dieAge}
                    onChange={handleChange}
                    unit="years old"
                />
                <InputField
                    label="Retire at (Age)"
                    name="retireAge"
                    value={inputs.retireAge}
                    onChange={handleChange}
                    unit="years old"
                />
                <InputField
                    label="Monthly Expenses"
                    name="monthlyExpenses"
                    value={inputs.monthlyExpenses}
                    onChange={handleChange}
                    unit="万円"
                />
                <InputField
                    label="Real Annual Yield"
                    name="annualYield"
                    value={inputs.annualYield}
                    onChange={handleChange}
                    step="0.1"
                    unit="%"
                />
                <InputField
                    label="Pension Start Age"
                    name="pensionStartAge"
                    value={inputs.pensionStartAge}
                    onChange={handleChange}
                    unit="years old"
                />
                <InputField
                    label="Monthly Pension"
                    name="pensionMonthly"
                    value={inputs.pensionMonthly}
                    onChange={handleChange}
                    unit="万円"
                />
                <InputField
                    label="Initial Buffer (Lump sum)"
                    name="lumpSumBuffer"
                    value={inputs.lumpSumBuffer}
                    onChange={handleChange}
                    step="10"
                    unit="万円"
                />
            </div>
        </div>
    );
};

export default InputSection;
