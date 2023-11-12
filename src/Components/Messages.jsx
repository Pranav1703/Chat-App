import React from 'react'
import "../styles/msg.css"
const Messages = ({user,text,img}) => {
  
  let styling = {};

  if(user==="self"){
    styling = {
      "justifyContent": "flex-end",
      
  }
  }
  

  return (
    
    <div className='msg' style={styling}>
        {user==="other" && <img src={img} alt=""/>}
        <p> {text} </p> 
        {user==="self" && <img src={img} alt=""/>}
    </div>
  )
}

export default Messages