import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [rates, setRates] = useState(undefined)
  const [fromCurrency, setFromCurrency] = useState('EUR')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromValue, setFromValue] = useState()
  const [toValue, setToValue] = useState()

  useEffect(() => {
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then((res) => res.json())
    .then((json) => { setRates(json) })
    .catch((err) => {
      console.warn(err);
      alert('проблеми при завантаженні курсів')
    })}, [])

  function get_result(cur_1, cur_2, value){
    if (value === '')
      return ''
    else {
      let cur_1_value, cur_2_value, kef = 0;
      if (cur_1 === cur_2){
        kef = 1;
      } else {
        for (let i = 0; i < rates.length; i++){
          if (rates[i].cc === cur_1)
            cur_1_value = rates[i].rate
          else if (rates[i].cc === cur_2)
            cur_2_value = rates[i].rate
        }
  
        if (cur_1 === 'UAH'){ cur_1_value = 1 }
        if (cur_2 === 'UAH'){ cur_2_value = 1 }
  
        kef = cur_1_value / cur_2_value    
      }
      kef = Math.round(kef * 100) / 100
      return Math.round(value * kef * 100)/100
    }
  }

  const change_from_to_value = (from_value) => {
    setFromValue(from_value)
    setToValue(get_result(fromCurrency, toCurrency, from_value))
  }
  const change_to_from_value = (to_value) => {
    setToValue(to_value)
    setFromValue(get_result(toCurrency, fromCurrency, to_value))    
  }

  useEffect(() => {
    if (rates !== undefined && fromValue !== undefined && toValue !== undefined)
      change_from_to_value(fromValue)    
  }, [fromCurrency])
  useEffect(() => {
    if (rates !== undefined && fromValue !== undefined && toValue !== undefined)
      change_to_from_value(toValue)    
  }, [toCurrency])

  return (
    <div className="App">
      <Block
      value={fromValue} currency={fromCurrency}
      onChangeCurrency={(cur) => {setFromCurrency(cur)}}
      onChangeValue={(value) => {change_from_to_value(value)}} />

      <Block
      value={toValue} currency={toCurrency}
      onChangeCurrency={(cur) => {setToCurrency(cur)}}
      onChangeValue={(value) => {change_to_from_value(value)}} />
    </div>
  );
}

export default App;
