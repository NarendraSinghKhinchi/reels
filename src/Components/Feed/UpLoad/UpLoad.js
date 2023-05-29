import React,{useState} from 'react';
import {Alert , Button, LinearProgress} from '@mui/material' ;
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import {v4 as uuidv4} from 'uuid' ;
import {database,storage} from '../../fireBase/firebase' ;
import styles from './UpLoad.module.css' ;

const UpLoad = ({user})=>{
  const [error , setError] = useState('');
  const [loading , setLoading] = useState(false);
  
  const handleUpload = async(file)=>{
        if(file == null){
            setError("please select a file first");
            setTimeout(()=>{
                setError('');
            },5000)
            return ;
        }
        if(file.size/(1024*1024) > 100){
            setError("video files less than 100mb are allowed");
            setTimeout(()=>{
                setError('');
            },5000)
            return ;
        }
        try{
            setError('');
            setLoading(true);
            let uid = uuidv4() ;
            let uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
            uploadTask.on('state_changed', fn1 , fn2 , fn3);
            function fn1(snapshot){
                let progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100 ;
                console.log(`upload is ${progress} done`);
            }
            function fn2(error){
                setError("error occured please open console to know more");
                console.log(error);
                setTimeout(()=>{
                    setError('');
                },5000);
                return ;
            }
            function fn3(){
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    const obj = {
                        likes:[],
                        comments:[],
                        pId:uid,
                        pUrl : url,
                        uName:user.fullName,
                        uProfile:user.profileUrl,
                        userId:user.userId,
                        createdAt:database.getTimeStamp
                    }
                    // database will give unique id then ref will have the just saved obj
                    database.posts.add(obj).then(ref=>{
                        let res = database.users.doc(user.userId).update({
                            postIds :user.postIds != null ? [...user.postIds,ref.id] : [ref.id]
                        })
                    }).then(()=>{
                        setLoading(false);
                    }).catch((error)=>{
                        setError("error occured open console to know more");
                        console.log(error);
                        setTimeout(()=>{
                            setError('');
                        },5000);
                        setLoading(false);
                    })
                })
                setLoading(false);
            }
        }catch(error){
            setError("error occured open console to know more");
            console.log(error);
            setTimeout(()=>{
                setError('');
            },5000);
            setLoading(false);
        }
        
    }
  return (
    <div>
        {error && <Alert severity="error">{error}</Alert>}
        <Button color="secondary" variant='outlined' startIcon={<MovieOutlinedIcon />} disabled={loading} component='label'>
            UPLOAD VIDEO
            <input type="file" accept="video/*" hidden onChange={(e)=>handleUpload(e.target.files[0])} ></input>
        </Button>
        {loading && <LinearProgress value={10} style={{marginTop:"5px"}} />}
    </div>
  )
}

export default UpLoad ;

