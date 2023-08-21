import React, { useState, useEffect } from 'react'
import axios from "axios"
const CreatePost = () => {
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





    const [errors, setErrors] = useState({});
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
        axios.post("http://localhost:8000/api/create", comPostInfo, { withCredentials: true })
            .then(res => {
                console.log('FRONT END CREATE', res);
                console.log('FRONT END CREATE RES DATA', res.data)
            })
            .catch(err => {
                console.log("something went wrong FRONT END CREATE", err);
                setErrors(err.response.data.errors)
            })
    }
    return (
        <div className='row'>
            <div className='row justify-content-center'>
                <div className="row">
                    <form className="col-md-4 offset-1" onSubmit={submitHandler} >
                        <div className='d-flex p-2 justify-content-between'>
                        </div>
                        <h4>What would you like to post {currentUser.name}?</h4>
                        <div className="form-group ">
                            <div className='d-flex p-10'>
                                {
                                    errors ? <p> {errors.message} </p> : null
                                }
                                <label> Title:</label>
                                <input type="text" name="title" placeholder=' Type here......' className="form-control" value={comPostInfo.title}
                                    onChange={changeHandler}
                                />

                                {
                                    errors ? <p> {errors.message} </p> : null
                                }
                                <label> Post :</label>
                                <textarea name="content" rows="4" cols="50" placeholder='Type here......' className="form-control" value={comPostInfo.content}
                                    onChange={changeHandler}
                                />


                                <button className="btn btn-primary mt-3" type="submit" >Submit</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div >
    )
}

export default CreatePost