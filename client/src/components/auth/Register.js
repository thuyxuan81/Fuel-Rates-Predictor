import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const[formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    });

    const {email, password, password2} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            console.log('Password do not match');
        }else {
            const newUser = {
                email,
                password
            };

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                const body = JSON.stringify(newUser);

                const res = await axios.post('/api/users', body, config);
                console.log(res.data);

            } catch (err) {

                console.error(err.response.data);
                
            }
        }
    };


    return (
        <Fragment>
             <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit= {e => onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" 
          value  = {email} onChange={e => onChange(e)} required/>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value  = {password} onChange={e => onChange(e)} required
            minLength="6"
            
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value  = {password2} onChange={e => onChange(e)} required
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
    )
}

export default Register