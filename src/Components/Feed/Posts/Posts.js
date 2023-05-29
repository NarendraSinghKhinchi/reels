import React,{useState,useEffect} from 'react' ;
import {CircularProgress, Avatar} from '@mui/material';
import { database } from '../../fireBase/firebase';
import Video from './Videos/Video' ;
import Like from './Like/Like';
import Comments from './Comments/Comments';
import Styles from "./Posts.module.css" ;
function Posts({userData}) {
  const [posts , setPosts] = useState(null);
  
  useEffect(()=>{
    let parr = [];
    const unsub = database.posts.orderBy('createdAt','desc').onSnapshot((querySnapshot)=>{
        parr = [];
        querySnapshot.forEach((doc)=>{
            let data = {
                ...doc.data(),
                postId : doc.id
            }
            parr.push(data);
        })
        setPosts(parr);
        return ()=>{
            unsub();
        }
    });
  },[]);
  const stylesforlike = {
    position: "absolute",
    bottom: "15%",
    left:"12%" ,
    cursor: "pointer",
  }
  return (
    <div>
        {
            posts==null || userData==null ?  <CircularProgress /> :
            <div className={Styles.videoContainerWrapper}>
                {   
                    posts.map((post,index)=>{
                        return (
                            <React.Fragment key={index}>
                                <div className={Styles.videoContainer}>
                                    <Video src={post.pUrl} styles={Styles.videoComp} ></Video>
                                    <div className={Styles.fa}>
                                        <Avatar src={userData.profileUrl} />
                                        <h4>{userData.fullName}</h4>
                                    </div>
                                    <Like userData={userData} postData={post} stylesObj={stylesforlike}  />
                                    <Comments userData={userData} postData={post}></Comments>
                                </div>
                            </React.Fragment>
                        )
                    })
                    
                }
            </div>
        }
    </div>
  )
}

export default Posts ;