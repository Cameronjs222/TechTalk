import React, { useState } from 'react'
import axios from "axios"
const CreatePost = () => {
    const [errors, setErrors] = useState({});
    const [comPostInfo, setComPostInfo] = useState({
        title: '',
        post: ''
    })
    const changeHandler = (e) => {
        setComPostInfo({ ...comPostInfo, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/create", comPostInfo)
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
        <div class='row'>
            <div className='row justify-content-center'>
                <div className="row">
                    <form className="col-md-4 offset-1" onSubmit={submitHandler} >
                        <div className='d-flex p-2 justify-content-between'>
                        </div>
                        <h4>What would you like to Post?</h4>
                        <div className="form-group ">
                            <div className='d-flex p-10'>
                                <p>
                                    {
                                        errors.title ? <p> {errors.title.message} </p> : null
                                    }
                                    <label> Title:</label>
                                    <input type="text" name="title" placeholder=' Type here......' className="form-control"
                                        onChange={changeHandler}
                                    />
                                </p>
                                <p>
                                    {
                                        errors.post && <p> {errors.post.message}  </p>
                                    }
                                    <label> Post :</label>
                                    <textarea name="post" rows="4" cols="50" placeholder='Type here......' className="form-control"
                                        onChange={changeHandler}
                                    />
                                </p>

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