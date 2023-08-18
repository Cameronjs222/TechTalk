import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Update = () => {
    const { id } = useParams();
    const [errors, setErrors] = useState({})
    const [updatePost, setUpdatePost] = useState({
        title: '',
        post: "",

    })
    useEffect(() => {
        axios.get(`http://localhost:8000/api/update/${id}`)
            .then((res) => {
                console.log("FRONT END GET ONE RES", res);
                console.log("FRONT END GET ONE RES DATA", res.data)
                setUpdatePost(res.data)
            })
            .catch(err => console.log('SOmething went wrong FRONT END GET ALL', err))
    }, [id])
    const submitHandler = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/update/${id}`, updatePost)
            .then(res => {
                console.log('FRONT END UPDATE RES', res);
                console.log('FRONT END UPDATE RES DATA', res.data)
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.errors)
            })
    }

    const changeHandler = (e) => {

        setUpdatePost({ ...updatePost, [e.target.name]: e.target.value })

    }
    return (
        <div class='row'>
            <div className='row justify-content-center'>

                <div className="row">
                    <form className="col-md-4 offset-1" onSubmit={submitHandler} >
                        <div className='d-flex p-2 justify-content-between'>
                            <h2>Update Post</h2>
                        </div>
                        <h4>Edit {updatePost.title}</h4>
                        <div className="form-group ">
                            <p>
                                {
                                    errors.title ? <p> {errors.title.message} </p> : null
                                }

                                <label> Title:</label>
                                <input type="text" name="title" placeholder='Type here.......... ' className="form-control  "
                                    onChange={changeHandler} value={updatePost.title}
                                />
                            </p>
                            <p>
                                {
                                    errors.post && <p> {errors.post.message}  </p>
                                }
                                <label> Pet Type :</label>
                                <input type="text" name="post" placeholder=' Enter pet type' className="form-control  "
                                    onChange={changeHandler}
                                    value={updatePost.post}
                                />
                            </p>






                            <button className="btn btn-primary mt-3" type="submit" >Edit Post</button>

                        </div>

                    </form>
                </div>
            </div >
        </div >
    )
}
export default Update