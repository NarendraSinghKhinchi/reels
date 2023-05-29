import React,{useEffect , useState} from 'react' ;
import FavoriteIcon from '@mui/icons-material/Favorite';
import Styles from './Like.module.css' ;
import { database } from '../../../fireBase/firebase';

function Like({userData , postData , stylesObj}) {
  const [like , setLike] = useState(null);
  useEffect(()=>{
    let check = postData.likes.includes(userData.userId)?true:false ;
    setLike(check);
  },[postData]);
  const handleLike = ()=>{
    if(like == true){
        let narr = postData.likes.filter((ele)=>{
            if(ele != userData.userId)return true ;
            return false ;
        })
        database.posts.doc(postData.postId).update({
            likes:narr,
        })
    }else{
        let narr = [...postData.likes , userData.userId];
        database.posts.doc(postData.postId).update({
            likes:narr,
        })
    }
  }
  return (
    <div style={stylesObj}>
        {
            like != null ?
            <>
            {
                like ? <FavoriteIcon className={Styles.likedIcon} onClick={handleLike} /> 
                : <FavoriteIcon className={Styles.notLikedIcon} onClick={handleLike}/> 
            }</> :
            <></> 
        }
    </div>
  )
}

export default Like ;