import { React, useState } from 'react';
import Input from '../../utils/input/input';
import './autorization.css';
import { registration } from '../../actions/user';

const Registration = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   return (
      <div className="autorization">
         <div className="autorization__header">Registracion</div>
         <Input
            setValue={setEmail}
            value={email}
            type="text"
            placeholder="Enter your email"
         />
         <Input
            setValue={setPassword}
            value={password}
            type="password"
            placeholder="Enter your password"
         />
         <button
            className="autorization__btn"
            onClick={() => registration(email, password)}
         >
            Join
         </button>
      </div>
   );
};
export default Registration;
