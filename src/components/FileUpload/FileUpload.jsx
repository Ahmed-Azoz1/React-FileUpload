import React, { useRef, useState } from 'react'

const FileUpload = () => {

    const inputRef = useRef();

    // State المدخلات
    const [selectedFile,setSelectedFile] = useState(null);
    const [progress,setProgress] = useState();
    const [uploadStatus,setUploadStatus] = useState("select");   // تغيير الحالة الى  "select" , "uploading" , "done"
    
    // handle file تغيير الحالة
    const handleFileChange = (e)=>{
        if (e.target.files && e.target.files.length > 0){
            setSelectedFile(e.target.files[0]);
        }
    }


    return (
        <div>
            <input type="file" ref={inputRef} onChange={handleFileChange} className="hidden" />
        </div>
    )
}

export default FileUpload