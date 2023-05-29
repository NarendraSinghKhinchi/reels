import React from 'react'
import ReactDOM from 'react-dom';
import Styles from './Video.module.css' ;

function Video(props) {
  const handleMuteUnmute = (e)=>{
    e.preventDefault();
    e.target.muted = !e.target.muted ;
  }
  const handleScroll = (e)=>{
    let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
    if(next){
        next.scrollIntoView();
        e.target.muted = true ;
    }
  }
  return (
    <video onEnded={handleScroll}  muted src={props.src} className={Styles.videoTag} onClick={handleMuteUnmute}>
      
    </video>
  )
}

export default Video ;