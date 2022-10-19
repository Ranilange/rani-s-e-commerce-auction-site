import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./Login.css"

export default function Login(props) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")



  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3000/login/", user).then((res) => {
      const data = res.data
      setError(data.error)
      setMessage(data.message)
      if (data) {
        localStorage.setItem('User', JSON.stringify(data))
      }
      if (!data.error) {

        return navigate("/")
      }
    })
  }

  return (
    <div className="page-container">
      {error ? (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      ) :
        null
      }


      <h1>LOGIN</h1>
      <div className="form-container" >
        <div className="form-content">
          <h3>E-mail</h3>
          <input
            className="input"
            type="text"
            name="email-address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user && user.email}
            required
            autofocus />
          <h3>Password</h3>
          <input
            className="input"
            type="password"
            name="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user && user.password}
            required />
          <button
            className="button"
            onClick={handleSubmit} type="submit">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

{/* <div>
        <div className="page-body" >
          <div >Login</div>
          <div className="form-container">
            <form action="" method="">
              <div class="form-group row">
                <label
                  for="email_address" >
                  E-Mail Address
                </label>
                <div >
                  <input
                    type="text"
                    name="email-address"
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    value={user && user.email}
                    required
                    autofocus
                  />
                </div>
              </div>
              <div >
                <label
                  for="password"  >
                  Password
                </label>
                <div >
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    value={user && user.password}
                    required
                  />
                </div>
              </div>

              <div >
                <div>
                  <div>
                    <label>
                      <input type="checkbox" name="remember" /> Remember Me
                    </label>
                  </div>
                </div>
              </div>

              <div >
                <button onClick={handleSubmit} type="submit">
                  Login
                </button>
                <a href="#" class="btn btn-link">
                  Forgot Your Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div> */}
