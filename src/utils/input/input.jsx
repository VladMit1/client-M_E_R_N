import React from 'react';
import './input.css';
const Input = ({ setValue, value, type, placeholder }) => {
   return (
      <input
         onChange={(e) => {
            setValue(e.target.value);
         }}
         value={value}
         type={type}
         placeholder={placeholder}
      ></input>
   );
};
export default Input;
