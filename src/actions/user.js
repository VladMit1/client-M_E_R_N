import axios from 'axios';
import { API_URL } from '../config';
import { setUser } from '../reducers/userReduce';

export const registration = async (email, password) => {
   try {
      const res = await axios.post(
         `${API_URL}/api/auth/registration`,
         {
            email,
            password
         }
      );
      alert(res.data.message);
   } catch (error) {
      alert(error.response.data.message);
   }
};

export const login = (email, password) => {
   return async (dispatch) => {
      try {
         const response = await axios.post(`${API_URL}/api/auth/login`, {
            email,
            password
         });
         dispatch(setUser(response.data.user));
         localStorage.setItem('token', response.data.token);
      } catch (error) {
         alert(error.response.data.message);
      }
   };
};
export const auth = () => {
   return async (dispatch) => {
      try {
         const response = await axios.get(`${API_URL}/api/auth/auth`,

            {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
            }
         });
         dispatch(setUser(response.data.user));
         localStorage.setItem('token', response.data.token);
      } catch (error) {
         alert(error.response.data.message);
         localStorage.removeItem('token');
      }
   };
};
export const uploadAvatar = (file) => {
   return async (dispatch) => {
      try {
         const formData = new FormData();
         formData.append('file', file);
         const response = await axios.post(
            `${API_URL}/api/files/avatar`,
            formData,
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
               }
            }
         );
         dispatch(setUser(response.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const deleteAvatar = () => {
   return async (dispatch) => {
      try {
         const response = await axios.delete(`${API_URL}/api/files/avatar`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
            }
         });
         dispatch(setUser(response.data));
      } catch (error) {
         console.log(error);
      }
   };
};
