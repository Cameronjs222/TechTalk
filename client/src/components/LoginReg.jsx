import React, { useState } from 'react'
import logo from '../img/logo2-5.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const LoginReg = () => {
    
//---------//       
//  LOGIN  //
//---------//
       
        const [userLogin, setUserLogin] = useState({
            name: "",
            password: ""
        })
        const [errors, setErrors] = useState({})
        const navigate = useNavigate();
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
        
    
    
    
 //-------------------//
 //   REGISTRATION   //
 //------------------//
       
    
        const [userReg, setUserReg] = useState({
            name: "",
            email: "",
            password: "",
            confirmPass: ""
        })

        const [regErrors, setRegErrors] = useState({})
        const regChangeHandler = (e) => {
            setUserReg({
                ...userReg,
                [e.target.name]: e.target.value
            })
        }

        const regValidator = () =>{
            let isValid = true
            if(userReg.name.length < 2){
                return false
            }
            else if(userReg.email.length < 3){
                return false
            }else if(userReg.password.length < 10 ){
                return false
            }
            return isValid
        }

        const regSubmit = (e) => {
            e.preventDefault()
            if(regValidator()){
                axios.post('http://localhost:8000/api/users', userReg )
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                    navigate("/home")
            }
            else{
                setRegErrors({
                    name: "Full Name must at least be 2 characters long",
                    email: "Email must least be 3 characters long",
                    password: "Password must be at least 10 characters long",
                })
            }
        }
    
  return (
<div className='logregmain'>

    
    <div className='mainCont'>
        
        <div className='logLeft'>
          <img src={logo} alt='Logo' id='logo1'/> <br />
            
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
                <button type='submit' className='btn btn-dark'>Login</button>
            </form>
        </div>

        <div className='regRight'>
           
            <h1 className='regText'>Create a Free Account Now</h1>
            <form action="" className='logForm' onSubmit={regSubmit}>
                

                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Full Name"  onChange={regChangeHandler}/>
                    <label for="floatingInput" htmlFor='name'>Full Name</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={regChangeHandler}/>
                    <label for="floatingInput">Email address</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={regChangeHandler} />
                    <label for="floatingPassword">Password</label>
                </div>

                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={regChangeHandler} />
                    <label for="floatingPassword">Password</label>
                </div>
                    <br />
                <button type='submit' className='btn btn-dark'>Register</button>
            </form>
            {regErrors.name ? <p>{regErrors.name}</p> : ""}
            {regErrors.email ? <p>{regErrors.email}</p> : ""}
            {regErrors.password ? <p>{regErrors.password}</p> : ""}
            {regErrors.password !== regErrors.confirmPass ? <p>Password does not match</p> : null}
        </div>
    </div>

</div>
  )
}

export default LoginReg;