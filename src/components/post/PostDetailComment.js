import React, { useEffect, useState } from "react";
import { useParams, Link, Route } from "react-router-dom";
import { getPostComments } from "./PostManager"
import { deleteComment } from "../comment/CommentManager";
import { CommentCard } from "../comment/CommentCard";
import { UserCommentCard } from "../comment/UserCommentCard";

export const PostDetailComment = () => {

    const [comments, setComments] = useState([]);
    const {postId} = useParams();
    
    useEffect(() => {
        getPostComments(postId)
            .then(data => 
                (setComments(data)))
    }, [])

    const delComment = (commentId) => {
        deleteComment(commentId)
            .then(() => getPostComments(postId).then(setComments))
    }

    return (
        <>
        <article className="commentlist">
        <h2>Comments</h2>
        <Link to={`/posts/comments/new/${postId}`}><button className="post__detail__button">Add comment</button></Link>
        {comments.map(comment => 
            <CommentCard
            key={comment.id}
            comment={comment}
            delComment={delComment}
            />
        )}
        </article>
        </>
    )

    
}

 