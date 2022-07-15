import React, {useEffect, useState} from 'react';
import './App.css';

import CurrencyRow from './CurrencyRow';

const requestURL = "https://api.exchangerate.host/latest?base=ZAR";

function App() {


  const [currency, setCurrency] = useState([]);

  //from currency to base currency
  const [fromCurrency, setFromCurrency] = useState();
  //to currency
  const [toCurrency, setToCurrency] = useState();
  //exchange rate
  const [exchangeRate, setExchangeRate] = useState(); 
  
  console.log(exchangeRate);
  //amount to convert
  const [amount, setAmount] = useState(1);
  //converted amount
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [amountIntFromCurrency, setAmountIntFromCurrency] = useState(true);
  
  // console.log(currency);

  //const [base, setBase] = useState("ZAR");
  //update currency every 15 minutes
  //const [interval, setInterval] = useState(15 * 60 * 1000);
  //const [error, setError] = useState(null);

  let toAmount, fromAmount;
  if(amountIntFromCurrency){
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  }
  else {
    fromAmount = amount / exchangeRate;
    toAmount = amount;
  }


  useEffect(() => {

    fetch(requestURL)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setCurrency([data.base, ...Object.keys(data.rates)]);

        setFromCurrency(data.base);
        setToCurrency(Object.keys(data.rates)[0]);

        setExchangeRate(data.rates[Object.keys(data.rates)[0]]);
        //setBase(data.base);
        //setInterval(15 * 60 * 1000);



      }
    );
  }, []);
  
  useEffect(() => {
    if (fromCurrency!=null && toCurrency!=null) {
      fetch(requestURL)
        .then((response) => response.json())
        .then((data) => {
          setExchangeRate(data.rates[toCurrency]);
        });
    }
  }
  , [fromCurrency, toCurrency]);
    
    
    
    
    return (
      <>
        <h1>Convert</h1>
        <CurrencyRow
         
          currency={currency}

          selectedCurrency={fromCurrency}
          
          onSelect={(event) => setFromCurrency(event.target.value)}

          amount={fromAmount}
          onChangeAmount={(event) => {
            setAmount(event.target.value);
            setAmountIntFromCurrency(true);
          }
          }

        
        />
        <div className='equals'>=</div>
        <CurrencyRow
        
          currency={currency}
          selectedCurrency={toCurrency}
         
          onSelect={e => setToCurrency(e.target.value)}
          amount={toAmount}

          onChangeAmount={(event) => {
            setAmount(event.target.value);

            setAmountIntFromCurrency(false);
          }
          }
        />
      </>
    );
  }

export default App;
