import { useSelector } from 'react-redux';
import { File } from './file/File';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './fileList.css';
import { useRef } from 'react';

export const FileList = () => {
   const files = useSelector((state) => state.files.files);
   const fileView = useSelector((state) => state.files.view);
   const nodeRef = useRef(null);
   return files.length === 0 ? (
      <div className="loader">This folder is empty</div>
   ) : (
      (fileView === 'plate' && (
         <div className="fileplate">
            {files.map((file) => (
               <File fileView={fileView} key={file._id} file={file} />
            ))}
         </div>
      )) ||
         (fileView === 'list' && (
            <div className="filelist">
               <div className="filelist__header">
                  <div className="filelist__name">Name</div>
                  <div className="filelist__date">Date</div>
                  <div className="filelist__size">Size</div>
               </div>
               <TransitionGroup>
                  {files.map((file) => (
                     <CSSTransition
                        key={file._id}
                        timeout={500}
                        classNames={'file'}
                        exit={false}
                        nodeRef={nodeRef}
                     >
                        <File fileView={fileView} file={file} />
                     </CSSTransition>
                  ))}
               </TransitionGroup>
            </div>
         ))
   );
};
