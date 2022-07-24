import react, { useState, useEffect } from "react";
import { UserCard } from "./UserCard"
import { getAllUsers } from "./UserManager";
import "./UserList.css"

export const UserList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers()
            .then(data =>
                (setUsers(data)))
    }, [])

    useEffect(() => {
        console.log(users)
    }, [users])

    // sorts all users alphabetically by username
    const [sortedUsers, setsortedUsers] = useState([]);

    useEffect(() => {
        const tempUsers = users.sort((a,b) => (a.user.username.toLowerCase() > b.user.username.toLowerCase()) ? 1 : -1)
        setsortedUsers(tempUsers)
    }, [users])

    return (
        <>
        <article className="userList">
        <h2>All users</h2>
        <div className="users__list__headers">
            <p className="user__list__header user__list__header__one">Username</p>
            <p className="user__list__header user__list__header__two">First</p>
            <p className="user__list__header user__list__header__three">Last</p>
            <p className="user__list__header user__list__header__four">Email</p>
        </div>
        {users.map(user =>
            <UserCard
            key={user.id}
            user={user}
            />
        )}
        </article>
        </>
        )
}