import React, { useState } from 'react';

function App() {
  // State for input values
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanYears, setLoanYears] = useState('');
  const [repaymentFrequency, setRepaymentFrequency] = useState('monthly'); // Default to monthly

  // State for calculated repayment and error messages
  const [repayment, setRepayment] = useState(null);
  const [error, setError] = useState('');

  // Function to calculate the repayment
  const calculateRepayment = () => {
    setError(''); // Clear previous errors
    setRepayment(null); // Clear previous repayment

    // Input validation
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const Y = parseFloat(loanYears);

    if (isNaN(P) || isNaN(annualRate) || isNaN(Y) || P <= 0 || annualRate < 0 || Y <= 0) {
      setError('Please enter valid positive numbers for all fields.');
      return;
    }

    let paymentsPerYear;
    switch (repaymentFrequency) {
      case 'weekly':
        paymentsPerYear = 52;
        break;
      case 'fortnightly':
        paymentsPerYear = 26;
        break;
      case 'monthly':
        paymentsPerYear = 12;
        break;
      default:
        setError('Invalid repayment frequency selected.');
        return;
    }

    const i = (annualRate / 100) / paymentsPerYear; // Periodic interest rate
    const N = Y * paymentsPerYear; // Total number of payments

    // Loan repayment formula
    let calculatedRepayment;
    if (i === 0) {
      // Handle zero interest rate (simple division)
      calculatedRepayment = P / N;
    } else {
      calculatedRepayment = P * (i * Math.pow(1 + i, N)) / (Math.pow(1 + i, N) - 1);
    }

    setRepayment(calculatedRepayment.toFixed(2)); // Round to 2 decimal places
  };

  // Function to reset all fields
  const resetForm = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanYears('');
    setRepaymentFrequency('monthly');
    setRepayment(null);
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-100 to-green-200 p-4 font-inter text-gray-800">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-teal-800 drop-shadow-md text-center">
        Home Loan Repayment Calculator
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-md border border-gray-300">
        {/* Loan Amount Input */}
        <div className="mb-6">
          <label htmlFor="loanAmount" className="block text-gray-700 text-lg font-semibold mb-2">
            Loan Amount ($)
          </label>
          <input
            type="number"
            id="loanAmount"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
            placeholder="e.g., 300000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>

        {/* Interest Rate Input */}
        <div className="mb-6">
          <label htmlFor="interestRate" className="block text-gray-700 text-lg font-semibold mb-2">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            id="interestRate"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
            placeholder="e.g., 4.5"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>

        {/* Years of Loan Input */}
        <div className="mb-6">
          <label htmlFor="loanYears" className="block text-gray-700 text-lg font-semibold mb-2">
            Years of Loan
          </label>
          <input
            type="number"
            id="loanYears"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
            placeholder="e.g., 30"
            value={loanYears}
            onChange={(e) => setLoanYears(e.target.value)}
          />
        </div>

        {/* Repayment Frequency Selection */}
        <div className="mb-8">
          <label className="block text-gray-700 text-lg font-semibold mb-3">
            Repayment Frequency
          </label>
          <div className="flex flex-wrap gap-4 justify-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-teal-600 focus:ring-teal-500"
                name="repaymentFrequency"
                value="weekly"
                checked={repaymentFrequency === 'weekly'}
                onChange={(e) => setRepaymentFrequency(e.target.value)}
              />
              <span className="ml-2 text-gray-700 text-lg">Weekly</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-teal-600 focus:ring-teal-500"
                name="repaymentFrequency"
                value="fortnightly"
                checked={repaymentFrequency === 'fortnightly'}
                onChange={(e) => setRepaymentFrequency(e.target.value)}
              />
              <span className="ml-2 text-gray-700 text-lg">Fortnightly</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-teal-600 focus:ring-teal-500"
                name="repaymentFrequency"
                value="monthly"
                checked={repaymentFrequency === 'monthly'}
                onChange={(e) => setRepaymentFrequency(e.target.value)}
              />
              <span className="ml-2 text-gray-700 text-lg">Monthly</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300 text-lg"
            onClick={calculateRepayment}
          >
            Calculate Repayment
          </button>
          <button
            className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-full shadow-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 text-lg"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>

        {/* Results and Error Display */}
        {error && (
          <p className="text-red-600 text-center text-lg mt-4 font-medium">{error}</p>
        )}

        {repayment !== null && !error && (
          <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200 text-center">
            <h3 className="text-xl font-bold text-teal-800 mb-2">Estimated Repayment:</h3>
            <p className="text-4xl font-extrabold text-teal-700">
              ${repayment} <span className="text-xl font-semibold text-gray-600">{repaymentFrequency.charAt(0).toUpperCase() + repaymentFrequency.slice(1)}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
