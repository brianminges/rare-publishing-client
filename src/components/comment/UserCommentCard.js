import React from "react";
import "./CommentCard.css"

export const UserCommentCard = ({ comment, delComment }) => {

    console.log(comment)
    
    return (
        <>
        <section className="comment">
        <p>{comment.content}</p>
        <p className="comment__details">Posted by {comment.author.user.username} on {comment.created_on}<button className="comment__delete__icon">🗑️</button></p>
        </section>
        

        </>
    )
}