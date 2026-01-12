import React from 'react';

const ResultSection = ({ totalRequired }) => {
    return (
        <div className="result-section glass-panel">
            <h2>Required Assets at Retirement</h2>
            <div className="result-value">
                <span className="currency">¥</span>
                <span className="amount">{totalRequired.toLocaleString()}</span>
                <span className="unit">万円</span>
            </div>
            <p className="result-subtitle">
                To die with zero assets at the specified age.
            </p>
        </div>
    );
};

export default ResultSection;
