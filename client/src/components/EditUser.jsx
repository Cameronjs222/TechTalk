import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditUser = (props) => {
    const {id} = useParams();
    const [name, setName] = useState([])
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    useEffect( ()=> {
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then(res => {
                console.log(res.data);
                setName(res.data.name);
                setEmail(res.data.email);
                setPassword(res.data.password);
            })       
            .catch(err=> console.log(err))
        })
    

    const onChangeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const editUser = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/users/${id}`)
            .then(res=> navigate("/"))
            .catch(err => console.log(err))
    }

return(

<div>
    
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

)
}

export default EditUser