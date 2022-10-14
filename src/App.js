import './App.css';
import app from './firebase/firebase.init';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import { useState } from 'react';

const auth = getAuth(app)


function App() {
  const provider =new GoogleAuthProvider()
  const gitProvider = new GithubAuthProvider()
  const [user, setUser] = useState({})

 const handleSingIn = () =>{
  signInWithPopup(auth, provider)
  .then( result =>{
    const user = result.user
    setUser(user)
    console.log(user)

  })
  .catch(error =>{
    console.error(error)
  })
 }
 const singOut = () =>{
    signOut(auth)
    .then(() =>{
      setUser({})
    })
    .catch(() =>{
      setUser({})
    })
 }
 const gitHubSingIn = () =>{
  signInWithPopup(auth, gitProvider)
  .then(result =>{
    const user = result.user
    setUser(user)
    console.log(user)
  })
  .catch(error =>{
    console.error(error)
  })
 }
  
  return (
    <div className="App">
  { user.uid ? 
<button onClick={singOut}>Sing Out</button>
:
  <>
    <button onClick={handleSingIn}>Sing In </button>
    <button onClick={gitHubSingIn} >Github LogIn</button>
  </>
  }
  {user.uid &&
    <div>
    <h2>Name: {user.displayName} </h2>
    <h3>Email: {user.email} </h3>
    <img src={user.photoURL} alt="" />
  </div>}
    </div>
  );
}

export default App;
