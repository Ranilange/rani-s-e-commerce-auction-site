import React, { useState } from "react";
import axios from 'axios';

export default function Register() {

  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post("http://localhost:3000/register/", user).then((res) => {
      const data = res.data
      setError(data.error)
      setMessage(data.message)
    })

  }

  return (
    <div>
      <h1>Register</h1>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      ) :
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      }

      <div className="container">
        <div className="row">
          <form className="row g-3 needs-validation" noValidate>
            <div className="col-12">
              <label htmlFor="validationCustomUsername" className="form-label">Username</label>
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend">@</span>
                <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  value={user && user.username}
                />
                <div className="invalid-feedback">
                  Please choose a username.
                </div>
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="validationCustomUsername" className="form-label">Email</label>
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend">@</span>
                <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  value={user && user.email}
                />
                <div className="invalid-feedback">
                  Please choose a email.
                </div>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="inputPassword" className=" col-form-label">Password</label>
              <div className="col-12">
                <input type="password" className="form-control" id="inputPassword"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  value={user && user.password}
                />
              </div>
            </div>
            {/* <div className="mb-3 row">
                <label htmlFor="inputPassword" className=" col-form-label">Confirm Password</label>
                <div className="col-12">
                <input type="password" className="form-control" id="inputPassword"/>
                </div>
            </div> */}
            <div className="col-12">
              <button onClick={handleSubmit} className="btn btn-primary" type="submit">Register</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
