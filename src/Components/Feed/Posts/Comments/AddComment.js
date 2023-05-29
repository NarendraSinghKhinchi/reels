import React,{useState , useEffect} from 'react'
import { TextField,Button } from '@mui/material'
import { database } from '../../../fireBase/firebase';
function AddComment({userData,postData}) {
    const [text,setText] = useState('');
    const handleCommentAdd = ()=>{
      let obj = {
        text:text,
        uProfileImage:userData.profileUrl,
        uName:userData.fullName
      }
      database.comments.add(obj).then((doc)=>{
        database.posts.doc(postData.postId).update({
          comments:[...postData.comments , doc.id],
        })
        setText('');
      })
    }
  return (
    <>
        <TextField size='small' label="comment"
           variant="outlined" value={text} onChange={e=>setText(e.target.value)} 
           style={{width:"85%"}}
        />
        <Button variant="contained" onClick={handleCommentAdd}>Post</Button>
    </>
  )
}

export default AddComment ;