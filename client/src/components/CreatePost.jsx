import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const CreatePost = ({ setOnePost }) => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [postInfo, setPostInfo] = useState({
        title: '',
        content: '',
        user_name: ''
    })
    console.log(errors);


    console.log(currentUser);
    const changeHandler = (e) => {
        setPostInfo({ ...postInfo, [e.target.name]: e.target.value, user_name: currentUser.name, user: currentUser._id })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        const lastPostDate = new Date(currentUser.last_post);
        const currentDate = new Date();

        if (
            lastPostDate.getDate() === currentDate.getDate() &&
            lastPostDate.getMonth() === currentDate.getMonth() &&
            lastPostDate.getFullYear() === currentDate.getFullYear()
        ) {
            setErrors({
                ...errors,
                title: "You can only post once every 24 hours."
            });
            console.log("You can only post once every 24 hours.");
            console.log(errors);
            return;
        }



        axios.patch(`http://localhost:8000/api/users/${currentUser._id}`, { last_post: Date.now() }, { withCredentials: true })
            .then(res => {
                console.log(res);
                console.log("^res^");
                console.log(res.data);
                console.log("^res.data^");
            })
            .catch(err => {
                console.log(err)
            })

        axios.post("http://localhost:8000/api/post/create", postInfo, { withCredentials: true })
            .then(res => {
                console.log('FRONT END CREATE', res);
                console.log('FRONT END CREATE RES DATA', res.data)
                setOnePost(res.data)
                //patch currentUser posts array to include new post
                axios.patch(`http://localhost:8000/api/users/${currentUser._id}`, { posts: [...currentUser.posts, res.data.post._id] }, { withCredentials: true })
                    .then(res => {
                        console.log(res);
                        console.log("^res^");
                        console.log(res.data);
                        console.log("^res.data^");
                    })
                    .catch(err => {
                        console.log(err)
                    })
                
                // navigate("/home") need to test without redirecting
            })
            .catch(err => {
                console.log("something went wrong FRONT END CREATE", err);
                setErrors(err.response.data.errors)
            })
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/me', { withCredentials: true })
            .then(res => {
                setCurrentUser(res.data.user);
            })
            .catch(err => {
                console.log(err)
            })
    }
        , []);
    return (

        //  jackie_branch starts here
        //     <div className='mainAddPost'>
        //         <div className='navBar'>
        //             <img src={logo} alt='Logo' id='logo2' />
        //             <div className='navLinks'>
        //                 <a href="/home"><button className='allP'>All Posts</button></a>
        //                 <a href="/create"><button className='myP'>My Post</button></a>
        //             </div>

        //             <div className='userLink'>
        //                 <p>Welcome <b>"{currentUser.name}"</b></p>
        //                 <a href="/editUser"><button className='accInfo'>User Info</button></a>  <button onClick={logOut} className='logbutton'>Logout</button>
        //             </div>
        //       </div>

        //                     <div className="addPostDiv">

        //                             <h1>Add a Post {currentUser.name}?</h1>
        //                             <p className='sign24'><i>"Post once every 24 hours"</i></p>

        //                         <form onSubmit={submitHandler} >
        //                             <div>
        //                                 <div>
        //                                 {errors && errors.map((item, idx) => (
        //                                 <p key={idx} style={{ color: 'red' }}>**{item}</p>
        //                                 ))} 
        //                                     <div  id='topTitle'>
        //                                         <input type="text" id='inputTitle' name="title" placeholder='Add Title Here' className="form-control" value={comPostInfo.title} onChange={changeHandler} />
        //                                     </div>

        //                                     <div>
        //                                         <textarea name="content" id='addPpost' placeholder='Add Post Here' rows="50" cols="50" className="form-control" value={comPostInfo.content} onChange={changeHandler} />
        //                                     </div>


        //                                     <button className="btn btn-dark" type="submit" >Add a Post</button>
        //                                 </div>
        // jackie_branch ends here

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
                            {/* <div className='input-group flex-nowrap'>
                                <p>
                                    {
                                        errors?.user_name ? <p> {errors.user_name?.message} </p> : null
                                    }
                                    <label> User Name:</label>
                                    <input type="text" name="user_name" placeholder=' Type here......' className="form-control"
                                        onChange={changeHandler}
                                    />
                                </p>
                            </div> */}
                            {/* User name is being set on submit */}
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