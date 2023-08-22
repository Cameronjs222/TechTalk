import React, { useState } from 'react'


import axios from "axios"
import { useNavigate } from 'react-router-dom';
const CreatePost = ({ setOnePost }) => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [postInfo, setPostInfo] = useState({
        title: '',
        content: '',
        user_name: ''
    })
    const changeHandler = (e) => {
        setPostInfo({ ...postInfo, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/post", postInfo)
            .then(res => {
                console.log('FRONT END CREATE', res);
                console.log('FRONT END CREATE RES DATA', res.data)
                setOnePost(res.data)
                navigate("/home")
            })
            .catch(err => {
                console.log("something went wrong FRONT END CREATE", err);
                setErrors(err.response.data.error.errors)
            })
    }
    return (
        <div class='row'>
            <div className='row justify-content-center'>

                <style>{'body { background-color:#D2B48C;}'}</style>
                <div className="row">
                    <form className="col-md-4 offset-1 mt-3" onSubmit={submitHandler} >
                        <h4 style={{ color: 'red' }}>What would you like to Post?</h4>

                        <div className="form-group ">
                            <div className='input-group flex-nowrap'>
                                <p>
                                    {
                                        errors?.title ? <p> {errors.title?.message} </p> : null
                                    }
                                    <label> Title:</label>
                                    <input type="text" name="title" placeholder=' Type here......' className="form-control"
                                        onChange={changeHandler}
                                    />
                                </p>
                            </div>
                            <div className='input-group flex-nowrap'>
                                <p>
                                    {
                                        errors?.user_name ? <p> {errors.user_name?.message} </p> : null
                                    }
                                    <label> User Name:</label>
                                    <input type="text" name="user_name" placeholder=' Type here......' className="form-control"
                                        onChange={changeHandler}
                                    />
                                </p>
                            </div>
                            <div>
                                <p>
                                    {
                                        errors?.content && <p> {errors.content?.message}  </p>
                                    }
                                    <label> Content :</label>
                                    <textarea name="content" rows="4" cols="50" placeholder='Type here......' className="form-control"
                                        onChange={changeHandler}
                                    > </textarea>
                                </p>
                            </div>
                            <div>
                                <button className="btn btn-success mt-3" type="submit" >Submit</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div >
        </div >
    )
}
export default CreatePost