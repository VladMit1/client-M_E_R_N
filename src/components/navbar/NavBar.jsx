import { React, useEffect, useState } from 'react';
import './navbar.css';
import Logo from '../../assets/sds.svg';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReduce';
import { auth } from '../../actions/user';
import Disk from '../disk/Disk';
import { getFiles, searchFiles } from '../../actions/file';
import { showLoader } from '../../reducers/appReducer';
import avatarLogo from '../../assets/img/avatar.svg';
import { API_URL } from '../../config';

const Navbar = () => {
   const isAuth = useSelector((state) => state.user.isAuth);
   const currentDir = useSelector((state) => state.files.currentDir);
   const currentUser = useSelector((state) => state.user.currentUser);
   const dispatch = useDispatch();
   const [searchName, setSearchName] = useState('');
   const [searchTimeout, setSearchTimeout] = useState(false);
   const avatar =avatarLogo
      
      //currentUser.avatar
      //? `${API_URL + '/static/' + currentUser.avatar}`
      //   : avatarLogo;
   
   const searchChangeHandler = (e) => {
      setSearchName(e.target.value);
      searchTimeout && clearTimeout(searchTimeout);
      dispatch(showLoader());

      Boolean(e.target.value)
         ? setSearchTimeout(
              setTimeout(
                 (value) => {
                    dispatch(searchFiles(value));
                 },
                 500,
                 e.target.value
              )
           )
         : dispatch(getFiles(currentDir));
   };

   useEffect(() => {
      dispatch(auth());
   }, [dispatch]);
   return (
      <nav className="app">
         <div className="navbar">
            <div className="container">
               <img src={Logo} alt="" className="navbar__logo" />
               <div className="navbar__header">New Cloud</div>
               {isAuth && (
                  <input
                     value={searchName}
                     onChange={(e) => searchChangeHandler(e)}
                     type="text"
                     placeholder="Search"
                     className="navbar__search"
                  ></input>
               )}
               {!isAuth && (
                  <>
                     <Link className="navbar__login" to="/login">
                        Log in
                     </Link>
                     <Link className="navbar__registration" to="/registration">
                        Registration
                     </Link>
                  </>
               )}
               {isAuth && (
                  <Link
                     to={'/'}
                     className="navbar__login"
                     onClick={() => dispatch(logout())}
                  >
                     Log out
                  </Link>
               )}
               {isAuth && (
                  <Link to="/profile">
                     <img src={avatar} alt="" className="navbar__avatar" />
                  </Link>
               )}
            </div>
         </div>

         <div className="wrap">{!isAuth ? <Outlet /> : <Disk />}</div>
      </nav>
   );
};
export default Navbar;
