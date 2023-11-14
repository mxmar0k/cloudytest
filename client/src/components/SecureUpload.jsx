import React, { useState } from "react";
import axios from 'axios';
import {TailSpin} from 'react-loader-spinner';

const SecureUpload = ()=> {

const [img, setImg] =useState(null);
const [video, setVideo] =useState(null);
const [loading, setLoading] =useState(false);

const uploadFile=async(type, timestamp, signature)=>{

    const folder=type === 'image' ? 'images' : 'videos';



    const data = new FormData();
    data.append("file", type==='image'? img:video);
    data.append("timestamp", timestamp);
    data.append("signature", signature);
    data.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
    data.append("folder", folder)
    

    try{
        let cloudName=process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
        console.log(process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
        let resourceType=type==='image'?'image':'video';
        let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

        const res = await axios.post(api, data);
        const {secure_url}=res.data;
        console.log(secure_url);
        return secure_url;
    } catch (error){
        console.error(error);
    }

}

const getSignatureForUpload=async(folder)=>{
    try{
        const res = await axios.post('${process.env.REACT_APP_BACKEND_BASEURL}/api/sign-upload',{folder});
        return res.data;
    }catch(error){
        console.error(error);
    }
    }
 
const handleSubmit =async (e)=>{
    e.preventDefault();
    try{
        setLoading(true);
        //firma para subir imagen
        const{timestamp: imgTimestamp, signature: imgSignature}=await getSignatureForUpload('images');
        //firma para el video
        const{timestamp: videoTimestamp, signature: videoSignature}=await getSignatureForUpload('videos');
        //subir img
        const imgUrl = await uploadFile('image', imgTimestamp, imgSignature);
        //subir video
        const videoUrl=await uploadFile('video', videoTimestamp, videoSignature);

        //mandar backend api request
        await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/videos`,{imgUrl, videoUrl})

        //resetear

        setImg(null);
        setVideo(null);

        console.log("File upload successful")
        setLoading(false);




    }catch (error){
        console.error(error)
    }
}


return(
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="Video">Video</label>
                <br />
                <input
                type="file"
                accept="video/*"
                id="video"
                onChange={(e)=>setVideo((prev)=>e.target.files[0])}
                />
            </div>
            <br />
            <div>
                <label htmlFor="img">Image</label>
                <br />
                <input
                type="file"
                accept="image/*"
                id="img"
                onChange={(e)=>setImg((prev)=>e.target.files[0])}
                />
            </div>
            <br />
            <button type="submit">Upload</button>
        </form>
        
        {loading && <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />}
    </div>

)
}

export default SecureUpload