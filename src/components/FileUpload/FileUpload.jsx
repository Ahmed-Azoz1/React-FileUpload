import React, { useRef, useState } from 'react'
import { MdOutlineFileUpload } from "react-icons/md";


const FileUpload = () => {

    const inputRef = useRef();

    // State المدخلات
    const [selectedFile,setSelectedFile] = useState(null);
    const [progress,setProgress] = useState(0);
    const [uploadStatus,setUploadStatus] = useState("select");   // تغيير الحالة الى  "select" , "uploading" , "done"
    
    // handle file تغيير الحالة
    const handleFileChange = (e)=>{
        if (e.target.files && e.target.files.length > 0){
            setSelectedFile(e.target.files[0]);
        }
    }

    // button file input
    const onChooseFile = ()=>{
        inputRef.current.click();
    }


    return (
        <div>
            <input type="file" ref={inputRef} onChange={handleFileChange} className="hidden" />

            {/* button */}
            {
                !selectedFile && (
                    <button className='flex justify-center items-center gap-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={onChooseFile}>
                        <MdOutlineFileUpload />
                        <span>Upload File</span>
                    </button>
                )
            }
            
        </div>
    )
}

export default FileUpload