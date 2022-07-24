import react, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostById } from "./PostManager";
import "./PostDetail.css"

export const PostDetail = ( ) => {

    const {postId} = useParams();
    const [post, setPost] = useState([]);


    // const loadPost = () => {
    //     getPostById(postId).then(data => setPost({
    //         id: post.id,
    //         title: post.title,
    //         author: post.user.user.username,
    //         category: post.category.label,
    //         publicationDate: post.publication_date,
    //         content: post.content,
    //         imageURL: image_url
    //     }))
    // }

    const loadPost = () => {
        getPostById(postId)
            .then(data => {
                setPost(data)
            })
    }

    useEffect(() => {
        loadPost()
    }, [])

    useEffect(() => {
        console.log(post)
    }, [post])
        
    return (
        <>
        <article className="post__detail__group">
            <img src={post.image_url} alt="{post.title}" /> 
            <h2>{post.title}</h2>
            <div className="post__detail__info">
                <p>Posted by <Link to={`/users/${post.user?.id}`}> {post.user?.user.username}</Link> in <span className="post__detail__category">{post.category?.label}</span> on {post.publication_date}</p>
            </div>
            <p>{post.content}</p>
            <div className="post__detail__buttons">
                <Link to={`${postId}/comments`}><button className="post__detail__button">View comments</button></Link>
                <Link to={`/posts/comments/new/${postId}`}><button className="post__detail__button">Add comment</button></Link>
            </div> 
        </article>
        
        </>
    )
}