import React from 'react'
import "../styles/msg.css"



const Messages = ({user,text,img,time}) => {
  
  let styling = {};

  if(user==="self"){
    styling = {
      "justifyContent": "flex-end",
    }
  }
  let T;
  
  console.log(time);
  
if(time){
  const d = new Date(time.seconds*1000);
  
  const timeStr= d.toLocaleTimeString();
  if(timeStr.length===10){
    T =  timeStr.slice(0,4);

  } 
  if(timeStr.length===11){
     T = timeStr.slice(0,5);
  }
  console.log(timeStr.length);
}

  return (
    
    <div className='msg' style={styling}>
        {user==="other" && <img src={img} alt=""/>}
        {user==="self" && <h6>{T}</h6>}
        <p> {text} </p> 
        {user==="other" && <h6>{T}</h6>}
        {user==="self" && <img src={img} alt=""/>}
    </div>
  )
}

export default Messages