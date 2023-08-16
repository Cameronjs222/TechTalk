import React from 'react'
import { useState, useEffect } from 'react'

const home = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        id: '',
        role: '',
        status: ''
    })

    function deleteUser() {
        axios.delete('http://localhost:5000/api/users/1')
            .then(res => {
                setUser({
                    name: res.data.name,
                    email: res.data.email,  
                    id: res.data.id,
                    role: res.data.role,
                    status: res.data.status
                })
            }
            )
            .catch(err => {
                console.log(err)
            })
    }

    function createUser() {
        axios.post('http://localhost:5000/api/users/1')
            .then(res => {
                setUser({
                    name: res.data.name,
                    email: res.data.email,
                    id: res.data.id,
                    role: res.data.role,
                    status: res.data.status
                })
            }
            )
            .catch(err => {
                console.log(err)
            })

        const test = () => {
            alert('test')
        }

        useEffect(() => {
            axios.get('http://localhost:5000/api/users/1')
                .then(res => {
                    setUser({
                        name: res.data.name,
                        email: res.data.email,
                        id: res.data.id,
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }, [])
        return (
            <div className='homeContainer'>

                <div className='homeText'>
                    <h1>Home</h1>
                    <p>Home page content</p>
                </div>

                <h2>User Name:</h2>
                <span>{user.name}</span>
                <h2>User Email:</h2>
                <span>{user.email}</span>
                <h2>User ID:</h2>
                <span>{user.id}</span>
                <h2>User Role:</h2>
                <h2>User Status:</h2>
            </div>
        )
    }
}

    export default home