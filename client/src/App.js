import './App.css';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import NoMatch from './components/NoMatch/NoMatch';
import { Link, Route, Routes } from 'react-router-dom'
import Add from './components/Add';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
function App() {
  const [userName, setUserName] = useState("")


  const logedOut = () => {
    window.location.reload()
    localStorage.removeItem("User")

  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('User'))
    if (userData) {
      setUserName(userData.userName)
    }
  }, [])
  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              {userName ?
                <div className='nav-item-container'>
                  <li class="nav-item">
                    <Link className="nav-link active" to="/">Home</Link>
                  </li>
                  <li class="nav-item">
                    <Link className="nav-link" to="/add">add item</Link>
                  </li>
                  <li class="nav-item">
                    <button onClick={logedOut}>logout</button>
                  </li>
                </div>
                :
                <div className='nav-item-container'>
                  <li class="nav-item">
                    <Link className="nav-link" to="/login">login</Link>
                  </li>
                  <li class="nav-item">
                    <Link className="nav-link" to="/register">register</Link>
                  </li>
                </div>}


            </ul>
          </div>
          <div className='userisloged-container'>
            <Avatar


            /><h4>Hello {userName}</h4>
          </div>
        </div>
      </nav>

      <main>
        <Routes>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="add" element={<Add />} />
          <Route path="/" element={<Home userName={userName} />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
