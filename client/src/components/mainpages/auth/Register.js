import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [user, setUser] = useState({
        name:'', email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)

            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2><br />
                <label>Full Name</label>
                <div className="form-group">
                <input type="text" name="name" required className="form-control"
                placeholder="Enter your name" value={user.name} onChange={onChangeInput} />
                </div>
                <label>Email</label>
                <div className="form-group">
                <input type="email" name="email" required className="form-control"
                placeholder="Enter your email" value={user.email} onChange={onChangeInput} />
                </div>
                <label>Password</label>
                <div className="form-group">
                <input type="password" name="password" required autoComplete="on" className="form-control"
                placeholder="Enter a Password" value={user.password} onChange={onChangeInput} />
                </div>
                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register