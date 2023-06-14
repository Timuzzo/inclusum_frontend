import { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();

    const databody = {
      email: email, 
      password: password, 
      username: username, 
      city: city, 
      avatar: "", 
      points: 0
    };

    await fetch('http://localhost:8080/user/signup', {
      method: 'POST',
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify(databody),
    })

    setEmail("");
    setCity("");
    setPassword("");
    setUsername("");
  }

  return (
    <>
    <form>
      <label>email:<input type='email' onChange={(e) => setEmail(e.target.value)} value={email}></input></label><br />
      <label>password:<input type='password' onChange={(e) => setPassword(e.target.value)} value={password}></input></label><br />
      <label>username:<input type='text' onChange={(e) => setUsername(e.target.value)} value={username}></input></label><br />
      <label>city:<input type='text' onChange={(e) => setCity(e.target.value)} value={city}></input></label><br />
      <button onClick={handleSubmit}>Signup</button>
    </form>
    </>
  );
}

export default App;
