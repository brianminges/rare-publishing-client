import react from "react";
import { Link } from "react-router-dom"
import "./UserCard.css"

export const UserCard = ({ user }) => {

    console.log(user)

    return (
        <>
        <div className="users__list__items">
            <p className="user__list__item user__list__item__one"><Link to={`/users/${user.user.id}`}>{user.user.username}</Link></p>
            <p className="user__list__item user__list__item__two">{user.user.first_name}</p>
            <p className="user__list__item user__list__item__three">{user.user.last_name}</p>
            <p className="user__list__item user__list__item__four">{user.user.email}</p>
        </div>
        </>
    )

 

}

 