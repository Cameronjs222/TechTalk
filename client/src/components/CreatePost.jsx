import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

import logo from '../img/logo2-4.jpg';


const CreatePost = () => {

    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/me', { withCredentials: true })
            .then(res => {
                console.log(res)
                setCurrentUser(res.data.user);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);


    function logOut() {
        axios.post('http://localhost:8000/api/users/logout',{}, { withCredentials: true })
          .then(res => {
            setCurrentUser()
            navigate("/")
          })
          .catch(err => {
            console.log(err)
          })
      }





    const [errors, setErrors] = useState([]);
    const [comPostInfo, setComPostInfo] = useState({
        title: '',
        content: '',
        user: currentUser._id
    })
    const changeHandler = (e) => {
        setComPostInfo({ ...comPostInfo, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/post/create", comPostInfo, { withCredentials: true })
            .then(res => {
                console.log('FRONT END CREATE', res);
                console.log('FRONT END CREATE RES DATA', res.data)
                setComPostInfo(res.data);
                navigate('/home')
            })
            .catch(err => {
                console.log("something went wrong FRONT END CREATE", err);
                const errors = err.response.data.error.errors;
                console.log(errors);
                const errorArr = [];
                for (const key of Object.keys(errors)) {
                    errorArr.push(errors[key].message)
                }
                console.log(errorArr);
                setErrors(errorArr);
            })
    }
    return (

    <div className='mainAddPost'>
        <div className='navBar'>
            <img src={logo} alt='Logo' id='logo2' />
            <div className='navLinks'>
                <a href="/home"><button className='allP'>All Posts</button></a>
                <a href=""><button className='myP'>My Post</button></a>
            </div>

            <div className='userLink'>
                <p>Welcome <b>"{currentUser.name}Mark Jacobs"</b></p>
                <a href="/editUser"><button className='accInfo'>User Info</button></a>  <button onClick={logOut} className='logbutton'>Logout</button>
            </div>
      </div>
            
                    <div className="addPostDiv">

                            <h4>What would you like to post {currentUser.name}?</h4>

                        <form onSubmit={submitHandler} >
                            <div>
                                <div>
                                {errors && errors.map((item, idx) => (
                                <p key={idx} style={{ color: 'red' }}>**{item}</p>
                                ))} 
                                    <div  id='topTitle'>
                                        <input type="text" id='inputTitle' name="title" placeholder='Add Title Here' className="form-control" value={comPostInfo.title} onChange={changeHandler} />
                                    </div>

                                    <div>
                                        <textarea name="content" id='addPpost' placeholder='Add Post Here' rows="50" cols="50" className="form-control" value={comPostInfo.content} onChange={changeHandler} />
                                    </div>


                                    <button className="btn btn-dark" type="submit" >Submit</button>
                                </div>
                            </div>
                        </form>

                    </div>
    </div>
          

 )
}

export default CreatePost