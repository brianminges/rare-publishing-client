import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getCategories, getPostById, updatePost } from "./PostManager";

export const PostEditForm = () => {
    const history = useHistory()
    const [isLoading, setIsLoading] =  useState(true);
    const {postId} =  useParams();
    
    const [categories, setCategories] = useState([])

    const loadCategories = () => {
        return getCategories().then(data => {
            setCategories(data)
        })
    }

    useEffect(() => {
        loadCategories()
    }, [])
    
    const [currentPost, setCurrentPost] = useState({
        title: "",
        publicationDate: "", 
        imageURL: "", 
        content: "", 
        category: 0
    });

    const loadPost = () => {
        if (postId) {
            getPostById(postId)
                .then(data => {
                    setCurrentPost({
                        id: postId,
                        title: data.title,
                        publicationDate: data.publication_date,
                        imageURL: data.image_url,
                        content: data.content,
                        category: data.category.id
                    })
                })
        }
    }

    useEffect(() => {
        loadPost()
    }, [])

    useEffect(() => {
        console.log('currentPost', currentPost)
    }, [currentPost])

    const handleFieldChange = (domEvent) => {
        const editedPost = {...currentPost}
        let selectedVal = domEvent.target.value
        editedPost[domEvent.target.name] = selectedVal
        setCurrentPost(editedPost)
    }

    return (
        <>
        <form className="postForm">
            <h2>Edit {currentPost.title}</h2>
            <fieldset>
                <div className="postForm__group">
                    <label htmlFor="title">Title</label>    
                    <input
                        type="text"
                        name="title"
                        className="postForm__input"
                        required
                        autoFocus
                        value={currentPost.title}
                        onChange={handleFieldChange}
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
                        value={currentPost.publicationDate}
                        onChange={handleFieldChange}
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
                        value={currentPost.imageURL}
                        onChange={handleFieldChange}
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
                        value={currentPost.content}
                        onChange={handleFieldChange}
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
                        value={currentPost.category}
                        onChange={handleFieldChange} >
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

                    const updatedPost = {
                        title: currentPost.title,
                        publication_date: currentPost.publicationDate,
                        image_url: currentPost.imageURL,
                        content: currentPost.content,
                        category: currentPost.category,
                        approved: 1
                    }

                    updatePost(updatedPost, postId)
                    .then(() => history.push('/posts'))
                }}
                className="formBtn"
                id="postForm__formBtn">
                    Update
                </button>
                

        </form>
        </>
    )
}


