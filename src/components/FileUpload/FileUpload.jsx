import React, { useRef, useState } from 'react'
import { MdOutlineFileUpload,MdOutlineDescription,MdOutlineClose,MdOutlineCheck } from "react-icons/md";
import AxiosInstance from '../utils/GlobalApi';




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

    // button close or reset state
    const clearFileInput = ()=>{
        inputRef.current.value = "";
        setSelectedFile(null);
        setProgress(0);
        setUploadStatus("select")
    }

    // button Upload file
    const handleUpload = async ()=>{
        // upload Done
        if(uploadStatus === 'done'){
            clearFileInput();
            return;
        }
        try{
            // uploading
            setUploadStatus("uploading");
            
            const formData = new FormData();
            formData.append("file",selectedFile);

            // post request to the server
            const response = await AxiosInstance.post('/uploader',formData,{
                onUploadProgress: (e)=>{
                    const percentCompeted = Math.round((e.loaded * 100)/e.total);
                    setProgress(percentCompeted)
                } 
            });
            setUploadStatus("done");
        }catch(error){
            setUploadStatus("select");
        }
    }

    return (
        <div>
            <input type="file" ref={inputRef} onChange={handleFileChange} className="hidden" />

            {/* button */}
            {
                !selectedFile && (
                    <button className='flex flex-col justify-center items-center gap-2 w-[330px] h-[150px] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={onChooseFile}>
                        <MdOutlineFileUpload size={24} />
                        <span>Upload File</span>
                    </button>
                )
            }
            {/* اظهار معلومات وبيانات الملف */}
            {
                selectedFile &&(
                    <>
                        <div className='flex items-center w-[350px] gap-4 rounded py-4 px-4 bg-slate-50 border-slate-200 border'>
                            <MdOutlineDescription className='text-blue-700' size={28}/>

                            {/* info */}
                            <div className='flex flex-1 gap-4 justify-between items-center'>

                                <div className='w-full gap-4'>
                                    <h6 className='font-medium text-base'>{selectedFile.name}</h6>
                                    {/* progress */}
                                    <div className='h-[6px] w-full bg-slate-200 rounded mt-3'>
                                        <div className={`w-[${progress}%] h-[6px] bg-blue-700 rounded transition-all`}></div>
                                    </div>
                                </div>

                                {
                                    uploadStatus === "select" ? 
                                    (
                                        //  button close
                                        <button className='p-[8px] flex items-center justify-center bg-slate-200 border-none rounded-full' onClick={clearFileInput}>
                                            <MdOutlineClose className='text-blue-700' size={20} />
                                        </button>
                                    ) 
                                    :
                                    (
                                        <button className='p-[8px] flex items-center justify-center bg-slate-200 border-none rounded-full'>
                                            {
                                                uploadStatus === "uploading" ? 
                                                (`${progress}%`) 
                                                : 
                                                uploadStatus === "done" ?
                                                (
                                                    <MdOutlineCheck className='text-blue-700' size={24} />
                                                )
                                                :
                                                null
                                            }
                                        </button>
                                    )
                                }
                            </div>
                        </div>

                        {/* button upload */}
                        <button className='w-[350px] p-2.5 mt-4 font-bold text-base bg-blue-700 hover:bg-blue-500 border-none rounded-lg text-white' onClick={handleUpload}>
                            {uploadStatus == "select" || uploadStatus == "uploading" ? "Uploading" :"Done"}
                        </button>
                    </>
                )
            }
        </div>
    )
}

export default FileUpload