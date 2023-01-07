import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from '../../actions/file';
import { FileList } from './fileList/FileList';
import { Popup } from './Popup';
import './disk.css';
import {
   setCurrentDir,
   setFileView,
   setPopupDisplay
} from '../../reducers/fileReduce';
import Uploader from './uploader/Uploader';

const Disk = () => {
   const dispatch = useDispatch();
   const currentDir = useSelector((state) => state.files.currentDir);
   const dirStack = useSelector((state) => state.files.dirStack);
   const loader = useSelector((state) => state.app.loader);
   const [dragEnter, setDragEnter] = useState(false);
   const [sort, setSort] = useState('type');

   useEffect(() => {
      dispatch(getFiles(currentDir, sort));
   }, [currentDir, dispatch, sort]);

   const showPopupHandler = () => {
      dispatch(setPopupDisplay('flex'));
   };

   const backClickHandler = () => {
      const backdirId = dirStack.pop();
      dispatch(setCurrentDir(backdirId));
   };

   const fileUploadHandler = (e) => {
      const files = [...e.target.files];
      files.forEach((file) => dispatch(uploadFile(file, currentDir)));
   };

   const stopreloadHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
   };

   const dragEnterHandler = (e) => {
      stopreloadHandler(e);
      setDragEnter(true);
   };
   const dragLeaveHandler = (e) => {
      stopreloadHandler(e);
      setDragEnter(false);
   };

   const dropHandler = (e) => {
      stopreloadHandler(e);
      const files = [...e.dataTransfer.files];
      files.forEach((file) => dispatch(uploadFile(file, currentDir)));
      setDragEnter(false);
   };
   if (loader) {
      return (
         <div className="loader">
            <div className="lds-dual-ring"></div>
         </div>
      );
   }
   return !dragEnter ? (
      <div
         className="disk"
         onDragEnter={dragEnterHandler}
         onDragLeave={dragLeaveHandler}
         onDragOver={dragEnterHandler}
      >
         <div className="disk__btns">
            <button className="disk__back" onClick={() => backClickHandler()}>
               Previous
            </button>
            <button className="disk__create" onClick={() => showPopupHandler()}>
               Create new folder
            </button>
            <div className="disk__upload">
               <label
                  htmlFor="disk__upload-input"
                  className="disk__upload-label"
               >
                  Upload file
               </label>
               <input
                  type="file"
                  className="disk__upload-input"
                  id="disk__upload-input"
                  multiple={true}
                  onChange={(e) => fileUploadHandler(e)}
               />
            </div>
            <select
               value={sort}
               onChange={(e) => setSort(e.target.value)}
               className="disk__select"
            >
               <option value="name">name</option>
               <option value="type">type</option>
               <option value="date">date</option>
               <option value="size">size</option>
            </select>
            <button
               className="disk__plate"
               onClick={() => dispatch(setFileView('plate'))}
            ></button>
            <button
               className="disk__list"
               onClick={() => dispatch(setFileView('list'))}
            ></button>
         </div>
         <FileList />
         <Popup />
         <Uploader />
      </div>
   ) : (
      <div
         className="drop-area"
         onDragEnter={dragEnterHandler}
         onDragLeave={dragLeaveHandler}
         onDragOver={dragEnterHandler}
         onDrop={dropHandler}
      >
         Drag and drop files here
      </div>
   );
};
export default Disk;
