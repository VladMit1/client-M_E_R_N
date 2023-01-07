import './file.css';
import dirLogo from '../../../../assets/dir.svg';
import fileLogo from '../../../../assets/file.svg';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReduce';
import { deleteFile, downloadFile } from '../../../../actions/file';
import sizeFormat from '../../../../utils/sizeFormat';

export const File = ({ fileView, file }) => {
   const dispatch = useDispatch();
   const currentDir = useSelector((state) => state.files.currentDir);

   const openDirHandler = (file) => {
      file.type === 'dir' &&
         dispatch(setCurrentDir(file._id)) &&
         dispatch(pushToStack(currentDir));
   };

   const downloadClickHandler = (e) => {
      e.stopPropagation();
      downloadFile(file);
   };
   const deleteClickHandler = (e) => {
      e.stopPropagation();
      dispatch(deleteFile(file));
   };

   return (
      (fileView === 'list' && (
         <div className="file" onClick={() => openDirHandler(file)}>
            <img
               src={file.type === 'dir' ? dirLogo : fileLogo}
               alt=""
               className="file__img"
            />
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{sizeFormat(file.size)}</div>
            {file.type !== 'dir' && (
               <button
                  className="file__btn file__download"
                  onClick={(e) => downloadClickHandler(e)}
               >
                  Download file
               </button>
            )}
            <button
               onClick={(e) => deleteClickHandler(e)}
               className="file__btn file__delete"
            >
               Delete file
            </button>
         </div>
      )) ||
      (fileView === 'plate' && (
         <div className="file-plate" onClick={() => openDirHandler(file)}>
            <img
               src={file.type === 'dir' ? dirLogo : fileLogo}
               alt=""
               className="file-plate__img"
            />
            {/*style for change*/}
            <div className="file-plate__name">
               {file.name.length >= 10 ? file.name.slice(0, 11) : file.name}
            </div>
            {/* -------------------------------- */}
            <div className="file-plate__btns">
               {file.type !== 'dir' && (
                  <button
                     className="file-plate__btn file-plate__download"
                     onClick={(e) => downloadClickHandler(e)}
                  >
                     Download file
                  </button>
               )}
               <button
                  onClick={(e) => deleteClickHandler(e)}
                  className="file-plate__btn file-plate__delete"
               >
                  Delete file
               </button>
            </div>
         </div>
      ))
   );
};
