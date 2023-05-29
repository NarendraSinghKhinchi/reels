import React from 'react';
import {useState , useContext , useEffect} from 'react';
import UpLoad from './UpLoad/UpLoad' ;
import Posts  from './Posts/Posts';
import styles from './Feed.module.css' ;
import NavBar from './NavBar/NavBar';
import { AuthContext } from '../Context/AuthContext';
import { database } from '../fireBase/firebase';
function Feed() {
  // we want the user obj from firestore database don't give it the user from authcontext
  const {user} = useContext(AuthContext);
  const [userFireStoreData , setuserFireStoreData] = useState('');
  useEffect(()=>{
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
      setuserFireStoreData(snapshot.data());
    })
    return ()=>{
      unsub();
    }
  },[user]);
    return (
      <>
      <NavBar userData={userFireStoreData}></NavBar>
      <div id={styles.feedHome} >
        <UpLoad user={userFireStoreData}></UpLoad>
        <Posts userData={userFireStoreData}></Posts>
      </div>
      </>
  )
}

export default Feed ;

