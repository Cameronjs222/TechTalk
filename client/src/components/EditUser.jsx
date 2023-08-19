import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditUser = (props) => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState([])

    useEffect( ()=> {
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then(res => setUser(res.data.user))
            .catch(err=> console.log(err))
    }, [])

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