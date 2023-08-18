import React, { useState } from 'react'
import logo from '../img/logo2-4.jpg';
import { useNavigate } from 'react-router-dom';

const LoginReg = () => {
    
    const [userLogin, setUserLogin] = useState({
        name: "",
        password: ""
    })

    const [errors, setErrors] = useState({})
 

    const onChangeHandler = (e) =>{
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    const FormValidator = () => {
        let isValid = true
        if(userLogin.name.length < 2){
            return false
        }

    }
  return (
<div className='logregmain'>

    
    <div className='mainCont'>
        
        <div className='logLeft'>
          <img src={logo} alt='Logo' id='logo1'/> <br />
            Login
            <form className='logForm'>
                
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                </div>

                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>
                    <br />
                <button type='submit' className='btn btn-dark'>Submit</button>
            </form>
        </div>

        <div className='regRight'>
           
           
            Register
            <form className='logForm'>
                

                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput" htmlFor='name'>Full Name</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>

                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>
                    <br />
                <button type='submit' className='btn btn-dark'>Register</button>
            </form>
        </div>
    </div>

</div>
  )
}

export default LoginReg