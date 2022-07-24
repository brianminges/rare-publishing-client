import react, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCategories, createPost } from "./PostManager";
import "./PostForm.css"

export const PostForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const [post, setPost] = useState({
        title: "",
        publicationDate: "",
        imageURL: "",
        content: "",
        category: 0
    })

    const loadCategories = () => {
    getCategories().then(data => setCategories(data))
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const changeState = (e) => {
        const newPost = {...post}
        let selectedVal = e.target.value
        newPost[e.target.name] = selectedVal
        setPost(newPost)
    }

    return (
        <>
        <form className="postForm">
            <h2>Submit a post</h2>
            <fieldset>
                <div className="postForm__group">
                    <label htmlFor="title">Title</label>    
                    <input
                        type="text"
                        name="title"
                        className="postForm__input"
                        required
                        autoFocus
                        value={post.title}
                        onChange={changeState}
                    /> 
                </div>    
            </fieldset>

            <fieldset>
                <div className="postForm__group">
                    <label htmlFor="publicationDate">Date</label>    
                    <input
                        type="text"
                        name="publicationDate"
                        className="postForm__input"
                        required
                        placeholder="yyyy-mm-dd"
                        value={post.publicationDate}
                        onChange={changeState}
                    /> 
                </div>    
            </fieldset>

            <fieldset>
                <div className="postForm__group">
                    <label htmlFor="imageURL">Image URL</label>    
                    <input
                        type="text"
                        name="imageURL"
                        className="postForm__input"
                        required
                        placeholder="http://imageurl.com"
                        value={post.imageURL}
                        onChange={changeState}
                    /> 
                </div>    
            </fieldset>

            <fieldset>
                <div className="postForm__group">
                    <label htmlFor="content">Content</label>    
                    <input
                        type="text"
                        name="content"
                        className="postForm__input"
                        required
                        value={post.content}
                        onChange={changeState}
                    /> 
                </div>    
            </fieldset>

            <fieldset>
                <div className="postForm__group">
                    <label htmlFor="category">Category</label>    
                    <select
                        type="text"
                        name="category"
                        className="postForm__input"
                        required
                        value={post.category}
                        onChange={changeState} >
                        <option value="0">Please select ...</option>
                            {categories.map(
                                category => (<option key={category.id} value={category.id}>{category.label}</option>)
                            )}
                    </select>
                </div>    
            </fieldset>

            <button
                type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const newPost = {
                        id: post.id,
                        title: post.title,
                        publication_date: post.publicationDate,
                        image_url: post.imageURL,
                        content: post.content,
                        approved: 1,
                        category: post.category,
                    }

                    createPost(newPost)
                    .then(() => history.push("/posts"))
                }}
                className="formBtn"
                id="postForm__formBtn">
                    Submit
            </button>
                

        </form>
        </>
    )
}