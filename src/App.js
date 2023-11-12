import './styles/App.css';
import Header from './Components/Header.jsx';
import Main from './Components/Main.jsx';
import {app} from "./firsebaseConfig.js"
import { getAuth, signInWithPopup, GoogleAuthProvider ,onAuthStateChanged,signOut} from "firebase/auth";
import { useState } from 'react';
import { useEffect } from 'react';

const auth = getAuth(app);

const loginHandler = ()=>{
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth,provider);
}

const logOutHandler = ()=>{
  signOut(auth);
}

function App() {
  
  const [user,setUser] = useState(false);
  
  useEffect(() => {

    const cleanUp = onAuthStateChanged(auth , (data)=>{
      setUser(data);
    })
  

    return () => {
      cleanUp();
    }
  }, [])
  


  return (
    <div className="App">

      {user?(
        <>
        <Header logOutFunc={logOutHandler}/>

        <Main ID={user.uid}  imgLink={user.photoURL} />
        </>
      ):(
        <>
        <div className='login'>
          <button onClick={loginHandler}>Login</button>
        </div>
        </>
      )}          

    </div>
  );
}

export default App;
