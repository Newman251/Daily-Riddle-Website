import { useState, useEffect } from 'react'
import { findAll, create } from '../services/data.mjs'
import CheckBar from './check-bar.js'
import UserListItem from './user-list-item.js'


function UserList() {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState([])

    const fetchData = async () => {
        setLoading(true)

        const res = await findAll()

        setUser([...res])
        setLoading(false)
    }

    const createUsers = async args => {
        const res = await create(args)

        setUser([...user, {
            id: res.id,
            ...args
        }])
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <section>
            <header>
                <h2>User Details</h2>
            </header>

            <CheckBar createUsers={createUsers}/>

            { loading && 
                <p>loading...</p>
            }

            <ul>
            {user.length > 0 && user.map(users => (
                <UserListItem users={users}/>
            ))}
            </ul>
        </section>
    )
}

export default UserList