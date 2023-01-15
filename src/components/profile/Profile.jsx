import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAvatar, uploadAvatar } from '../../actions/user';
import './profile.css';

const Profile = () => {
   const dispatch = useDispatch();

   const changeAvatarHandler = (e) => {
      const file = e.target.files[0];
      dispatch(uploadAvatar(file));
   };

   return (
      <div className="profile">
         <button
            onClick={() => dispatch(deleteAvatar())}
            className="delete-avatar"
         ></button>
         <div className="profile-input-img">
            <input
               accept="image/*"
               onChange={(e) => changeAvatarHandler(e)}
               type="file"
               className="profile-input"
            />
         </div>
      </div>
   );
};

export default Profile;
