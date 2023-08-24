import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const UpdatePost = ({ setOnePost }) => {

    const navigate = useNavigate()

    const { id } = useParams();
    const [errors, setErrors] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [updatePost, setUpdatePost] = useState({
        title: "",
        content: "",
        user_name: ""
    })

    useEffect
        (() => {
            axios.get('http://localhost:8000/api/users/me', { withCredentials: true })
                .then(res => {
                    setCurrentUser(res.data.user);
                })
                .catch(err => {
                    console.log(err)
                })
        }, []);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/post/${id}`)
            .then((res) => {
                console.log("FRONT END GET ONE RES", res);
                console.log("FRONT END GET ONE RES DATA", res.data)
                setUpdatePost(res.data.post)
            })
            .catch(err => console.log('Something went wrong FRONT END GET ALL', err))
    }, [id])
    const submitHandler = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/post/${id}`, updatePost)
            .then(res => {
                console.log('FRONT END UPDATE RES', res);
                console.log('FRONT END UPDATE RES DATA', res.data)
                setOnePost(res.data)
                navigate("/home")

            })
            .catch((err) => {
                console.log("Something went wrong FRONT END UPDATE", err);
                setErrors(err.response.data.error.errors)
            })
    }

    const changeHandler = (e) => {
        setUpdatePost({ ...updatePost, [e.target.name]: e.target.value })
    }
    return (
        <div class='row'>
            <style>{'body { background-color:#D2B48C;}'}</style>

            <div className='row justify-content-center'>


                <div className="row">
                    <form className="col-md-4 offset-1" onSubmit={submitHandler} >
                        <div className='d-flex p-2 justify-content-between'>
                            <h2 style={{ color: 'red' }}>Update Post</h2>
                        </div>
                        <div className="form-group ">
                            <p>
                                {
                                    errors.title ? <p> {errors.title.message} </p> : null
                                }

                                <label> Title:</label>
                                <input name="title" placeholder='Type here.......... ' className="form-control  "
                                    onChange={changeHandler} value={updatePost.title}
                                />
                            </p>
                            <p>
                                {
                                    updatePost.user_name ? <div><label> User Name :</label>
                                        <input name="user_name" placeholder='Type.......' className="form-control  "
                                            onChange={changeHandler}
                                            value={updatePost.user_name}

                                        /> </div> : "no user name"

                                }

                            </p>
                            <div></div>
                            <p>
                                {
                                    errors.content && <p> {errors.content?.message}  </p>
                                }
                                <label> Content :</label>
                                <textarea name="content" rows="4" cols="50" placeholder='Type here......' className="form-control"
                                    onChange={changeHandler} value={updatePost.content}
                                ></textarea>
                            </p>
                            <div />
                            <button className="btn btn-success mt-3" type="submit" >Edit Post</button>

                        </div>

                    </form>
                </div>
            </div >
        </div >
    )
}
export default UpdatePost