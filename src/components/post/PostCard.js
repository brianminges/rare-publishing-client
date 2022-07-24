import react, {useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./PostCard.css"
import "./../Rare.css"

export const PostCard = ({ post, delPost}) => {

    const userId = parseInt(localStorage.getItem("userId"))
    const [deletePopup, setDeletePopup] = useState(false)
    const deletePostCardDialog = useRef()

    if (userId === post.user.id)
        return (        
            <>
            <dialog ref={deletePostCardDialog}>
                <div className="overlay">
                    <div className="overlay__inner">
                        <h2>Are you sure you want to delete this post?</h2>
                        <div className="overlayBtns">
                            <button 
                            className="overlayBtn" 
                            onClick={e => deletePostCardDialog.current.close()}>
                            Cancel
                        </button>
                        <button 
                            className="overlayBtn" 
                            onClick={() => {
                                delPost(post.id)
                                deletePostCardDialog.current.close()}}>
                            Delete
                        </button>
                        </div>
                    </div>
                </div>
            </dialog>

            <section className="postcard">
                <div className="postcard__header">
                    <h3 className="postcard__header__title"><Link  to={`/posts/${post.id}`}>{post.title}</Link></h3> <span className="postcard__header__date">Posted {post.publication_date}</span>
                </div>
                <div className="postcard__photo">
                    <img src={post.image_url} alt={post.title}/>  
                </div>
                <div className="postcard__footer__group">
                    <div className="postcard__footer">
                        <p className="postcard__footer__auth">Posted by {post.user.user.username} in <span className="postcard__footer__cat">{post.category.label}</span> </p>
                    </div>
                                            
                    <div>
                    <button 
                        className="cardBtn" 
                        id="cardBbt__edit">
                            <Link to={`posts/${post.id}/edit`}><button className="cardBtn">✒️</button> </Link>
                    </button>
                    <button 
                        onClick={() => {
                            deletePostCardDialog.current.showModal()
                        }}
                        className="cardBtn" 
                        id="cardBbt__delete">
                    🗑️
                    </button>
                    </div>
                </div>
            </section>
            </>
        )
    else
        return (
            <>
            <section className="postcard">
                <div className="postcard__header">
                    <h3 className="postcard__header__title"><Link  to={`/posts/${post.id}`}>{post.title}</Link></h3> <span className="postcard__header__date">Posted {post.publication_date}</span>
                </div>
                <div className="postcard__photo">
                    <img src={post.image_url} alt={post.title}/>  
                </div>
                <div className="postcard__footer__group">
                    <div className="postcard__footer">
                        <p className="postcard__footer__auth">Posted by {post.user.user.username} in <span className="postcard__footer__cat">{post.category.label}</span> </p>
                    </div>
                </div>
            </section>
            </>
        )

}
 