import { React, useState } from 'react';
import Input from '../../utils/input/input';
import './autorization.css';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/user';
import { Link } from 'react-router-dom';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const dispatch = useDispatch();
   return (
      <div className="autorization">
         <div className="autorization__header">Login</div>
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
         <Link
            to={'/'}
            className="autorization__btn"
            onClick={() => dispatch(login(email, password))}
         >
            Join
         </Link>
      </div>
   );
};
export default Login;
