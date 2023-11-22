import React, { useEffect, useState } from 'react'
import "../styles/main.css"
import Messages from './Messages';
import {app} from "../firsebaseConfig"
import {addDoc, getFirestore, collection, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { useRef } from 'react';

const db = getFirestore(app)


const Main = ({ID,imgLink}) => {
  
  const [msg,setMsg] = useState("");
  const [messages,setMessages] = useState([]);

  const divToScroll = useRef(null);

  const onChangeHandler = (e)=>{
     setMsg(e.target.value)

  }

  const sumbitHandeler = async (e)=>{
    e.preventDefault();

    try { 
      await addDoc(collection(db,"MessagesCollection"),{
        text:msg,
        user: ID,
        uri:imgLink,
        createdAt:serverTimestamp(),
      });
      setMsg(""); 
      divToScroll.current.scrollIntoView({behavior:"smooth"})

    } catch (error) {
      alert(error);
    }
  
  }
  useEffect(() => {

    const Query = query(collection(db,"MessagesCollection"),orderBy("createdAt","asc"));

    const returnMessages = onSnapshot(Query, (snap)=>
      setMessages(snap.docs.map((i)=>{
        const id = i.id;
        return {id, ...i.data()}
      })));
     

    return ()=>{
      returnMessages();
    }
    
  }, []);
 
  return (
    <>
    <div className='chatContainer'>
        
        {
          messages.map((item)=>(
            <Messages key={item.id} user={item.user===ID?"self":"other"} text ={item.text} img = {item.uri} time={item.createdAt}/>          
          ))
          
        }
        <div ref={divToScroll}></div>

    </div>
    
    <div className='inputContainer'>
        <form onSubmit={sumbitHandeler}>
            <input value ={msg} onChange={onChangeHandler}/>
            <button className='btn' type="submit">➤</button>
        </form>
    </div>
    
    </>
  )
}

export default Main