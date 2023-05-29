import React,{useEffect,useState} from 'react' ;
import { useParams } from 'react-router-dom' ;
import { database } from '../fireBase/firebase';
import { CircularProgress, Typography } from '@mui/material';
import NavBar from '../Feed/NavBar/NavBar';
import Styles from './Profile.module.css' ;
import Video from '../Feed/Posts/Videos/Video';
function Profile() {
    const {id} = useParams();
    const [userData , setUserData] = useState(null);
    const [posts , setPosts] = useState(null);
    useEffect(()=>{
        database.users.doc(id).onSnapshot((snap)=>{
            setUserData(snap.data())
        })
    },[id]) ;
    useEffect(()=>{
        if(userData != null && userData.postIds){
            const fetchData = async()=>{
                let parr = [];
                for(let i = 0 ; i < userData.postIds.length ; i++){
                    let postData = await database.posts.doc(userData.postIds[i]).get();
                    parr.push({...postData.data(), postId:postData.id});
                }
                setPosts(parr);
            }
            fetchData();
        }
    })
  return (
    <> 
        {
            userData === null && posts === null ? <CircularProgress></CircularProgress> :
            <>
                <NavBar userData={userData}></NavBar>
                <div className={Styles.spacer}></div>
                <div className={Styles.container}>
                    <div className={Styles.upperPart}>
                        <div className={Styles.profileImg}>
                            <img src={userData.profileUrl}></img>
                        </div>
                        <div className={Styles.info}>
                            <Typography variant="h6">
                                Email:{userData.email}
                            </Typography>
                            <Typography>
                                Posts:{ userData.postIds ? userData.postIds.length : 0}
                            </Typography>
                        </div>
                    </div>
                        <hr style={{marginTop:"1rem" , marginBottom:"1rem" }}/>
                        <div className={Styles.postedVideos}></div>
                </div>
            </>
        }
    </>
  )
}

export default Profile