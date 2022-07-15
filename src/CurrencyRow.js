import React from 'react'

export default function CurrencyRow() {
  return (
    <div>
      <input type="number" placeholder="0.00" className='input' />
      <select>
        <option value="ZAR">ZAR</option> 
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="HKD">HKD</option> 
        <option value="KES">KES</option>
      </select>
    </div>
  );
}
