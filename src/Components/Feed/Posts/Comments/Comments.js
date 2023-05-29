import React,{useState , useEffect} from 'react'
import {Dialog,Card,CardContent,Typography,CircularProgress, Avatar, } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Styles from './Comments.module.css' ;
import Like from '../Like/Like';
import AddComment from './AddComment';
import { database } from '../../../fireBase/firebase';
function Comments({postData, userData}) {
 const [open,setOpen] = useState(null);
 const [postedComments, setpostedComments] = useState(null);
    useEffect(()=>{
        
        let asyncFunc = async()=>{
            let arr = [];
            for(let i = 0 ; i < postData.comments.length ; i++){
                let data = await database.comments.doc(postData.comments[i]).get();
                arr.push(data.data())
            }
            setpostedComments(arr);
        } ;
        asyncFunc();
        
    },[postData])
    const handleClickOpen = (id) => {
        setOpen(id);
    };
    const handleClose = () => {
    setOpen(null);
    }; 

  return (
    <React.Fragment>
        <ChatBubbleIcon className={Styles.chatIcon} onClick={(e)=>handleClickOpen(postData.pId)} />
        <Dialog
            open={open===postData.pId}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="md"
        >
            <div className={Styles.modalContainer}>
                <div className={Styles.videoContainer}>
                    <video src={postData.pUrl} autoPlay muted loop ></video>
                </div>
                <div className={Styles.commentsContainer}>
                    <Card>
                        <CardContent>
                            {
                                postedComments === null ? <CircularProgress /> :
                                <>  
                                    {  
                                        postedComments.map((comment,index)=>{
                                            return (
                                                <div key={index} style={{display:"flex", alignItems:"center", border:"1px solid salmon"}}>
                                                    <Avatar src={comment.uProfileImage}></Avatar>
                                                    <p><span>{comment.uName}</span>&nbsp;&nbsp; {comment.text}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </>  
                            }
                        </CardContent>
                    </Card>
                    <Card variant='outlined' style={{backgroundColor:"rgb(225, 229, 230)"}}>
                        <CardContent style={{padding:"0" , textAlign:"center"}}>
                            <Typography variant='h6' color="text.primary"  >
                            {postData.likes.length==0?'':`Liked by ${postData.likes.length} users` }
                            </Typography>
                            <div className={Styles.AddComment}>
                                <Like postData={postData} userData={userData} stylesObj={{marginRight:"2px"}}></Like>
                                <AddComment postData={postData} userData={userData}></AddComment>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Dialog>
    </React.Fragment>
  )
}

export default Comments ;