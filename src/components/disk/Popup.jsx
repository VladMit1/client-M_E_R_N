import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFile } from '../../actions/file';
import { setPopupDisplay } from '../../reducers/fileReduce';
import Input from '../../utils/input/input';

export const Popup = () => {
   const [dirName, setDirName] = useState('');
   const popupDisplay = useSelector((state) => state.files.popupDisplay);
   const currentDir = useSelector((state) => state.files.currentDir);
   const dispatch = useDispatch();
   const closePopup = () => {
      dispatch(setPopupDisplay('none'));
   };
   const createHandler = () => {
      dispatch(createFile(currentDir, dirName));
      closePopup();
      setDirName('')
   };

   return (
      <div
         className="popup"
         onClick={closePopup}
         style={{ display: popupDisplay }}
      >
         <div className="popup__content" onClick={(e) => e.stopPropagation()}>
            <div className="popup__header">
               <div className="popup__title">Create new folder</div>
               <button className="popup__close" onClick={closePopup}>
                  X
               </button>
            </div>
            <Input
               type="text"
               placeholder="Enter folder name..."
               value={dirName}
               setValue={setDirName}
            />
            <button className="popup__create" onClick={() => createHandler()}>
               Create
            </button>
         </div>
      </div>
   );
};
