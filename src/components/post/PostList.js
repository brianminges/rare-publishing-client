import react, { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import { getPosts, deletePost, getPostByCategory, getCategories } from "./PostManager"
import "./../Rare.css"
import { useParams } from "react-router-dom";
import "./PostForm.css";

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const { categoryId } = useParams()
    const [filterCategoryId, setFilterCategoryId] = useState(0)

    const loadPosts = () => {
        getPosts().then(data => setPosts(data))
    }

    useEffect(() => {
        loadPosts()
    }, [])

    useEffect(()  => {
        console.log(posts)
    }, [posts])

    useEffect(() => {
        getCategories().then(data => setCategories(data))
    }
    , [])

    const handleFilterByCategory = (categoryId) => {
        getPostByCategory(categoryId).then(data => {
            setPosts(data)})
    }

    const changeCategoryState = (domEvent) => {
        domEvent.preventDefault()
        const value = domEvent.target.value
        setFilterCategoryId(parseInt(value))
    }

    // sorts all posts with most recent at top of page
    const [sortedPosts, setSortedPosts] = useState([]);

    useEffect(() => {
        const tempPosts = posts.sort((a,b) => (a.publication_date < b.publication_date) ? 1 : -1)
        setSortedPosts(tempPosts)
    }, [posts])

    // deletes posts
    const delPost = (postId) => {
        deletePost(postId)
            .then(() => getPosts().then(setPosts))
    }

    return (
        <article className="postlist">
            <h2>All posts</h2>
            <form className="categoryFilterForm">
                <fieldset>
                    <div className="formgrid">
                        <label htmlFor="category">Filter by category</label>
                        <select name="category" id="category" className="form__input" onChange={changeCategoryState}>
                            <option value="">Select Category</option>
                            {categories.map(category => <option key={category.id} value={category.id}>{category.label}</option>)}
                        </select>
                        <button type="button"
                            onClick={()=> {handleFilterByCategory(parseInt(filterCategoryId))}}>
                                Filter</button>
                    </div>
                </fieldset>
            </form>            
            {posts.map(post =>
                <PostCard
                key={post.id}
                post={post}
                delPost={delPost}
                />
            )}
        </article>
    )
}
