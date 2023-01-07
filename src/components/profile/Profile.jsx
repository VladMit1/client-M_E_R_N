import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAvatar, uploadAvatar } from '../../actions/user';

const Profile = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const returnHomePage = () => {
      window.location.href !== '/' && navigate('/');
   };
   const changeAvatarHandler = (e) => {
      const file = e.target.files[0];
      dispatch(uploadAvatar(file));
      returnHomePage();
   };

   return (
      <div className="profile">
         <button
            onClick={() => dispatch(deleteAvatar(), returnHomePage())}
            className="delete-avatar"
         >
            Delete avatar
         </button>
         <input
            accept="image/*"
            onChange={(e) => changeAvatarHandler(e)}
            type="file"
            placeholder="Upload avatar"
            className="profile-input"
         />
      </div>
   );
};

export default Profile;
