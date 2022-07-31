import react, { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import { getPosts, deletePost, getPostByFilteredCategory, getCategories, getPostByFilteredUser, searchPosts } from "./PostManager"
import { getAllUsers } from "./../user/UserManager"
import "./../Rare.css"
import "./PostForm.css";

export const PostList = () => {
    const [ posts, setPosts ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const [ reset, setReset ] = useState(false)
    const [ filterCategoryId, setFilterCategoryId] = useState(0);
    const [ filterUserId, setFilterUserId ] = useState(0);
    const [ searchValue, setSearchValue ] = useState("")

    const loadPosts = () => {
        getPosts().then(data => setPosts(data))
    }

    useEffect(() => {
        loadPosts()
    }, [reset])

    useEffect(() => {
        getCategories().then(data => setCategories(data))
    }, [])

    useEffect(() => {
        getAllUsers().then(data => setUsers(data))
    }, [])

    const handleFilter = (id) => {
        if (filterCategoryId === 0 && filterUserId !== 0) {
            getPostByFilteredUser(id).then(data => {
                setPosts(data)
            })
        }
        else if (filterCategoryId !== 0 && filterUserId === 0) {
            getPostByFilteredCategory(id).then(data => {
                setPosts(data)
            })
        }
    }
    
    const handleSearch = (searchTerm) => {
        searchPosts(searchTerm).then(data => {
            setPosts(data)
        })
    }

    const handleChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        if (e.target.id === "category") {
            setFilterCategoryId(parseInt(value))
        }
        else if (e.target.id === "user") {
            setFilterUserId(parseInt(value))
        }
        else if (e.target.id === "search") {
            setSearchValue(value)
        }
    }
 
    // resets filters
    const handleReset = () => {
        setReset(true)
    }

    // sorts all posts with most recent at top of page
    const [sortedPosts, setSortedPosts] = useState([]);

    useEffect(() => {
        const tempPosts = posts.sort((a,b) => (a.publication_date < b.publication_date) ? 1 : -1)
        setSortedPosts(tempPosts)
    }, [posts])

    // sorts all users alphabetically from top of dropdown list
    const [sortedUsers, setSortedUsers] = useState([]);

    useEffect(() => {
        const tempUsers = users.sort((a,b) => (a.user.username.toLowerCase() > b.user.username.toLowerCase()) ? 1 : -1)
        setSortedUsers(tempUsers)
    }, [users])

    // sorts all categories alphabetically from top of dropdown list
    const [sortedCategories, setSortedCategories] = useState([]);

    useEffect(() => {
        const tempCategories = categories.sort((a,b) => (a.label.toLowerCase() > b.label.toLowerCase()) ? 1 : -1)
        setSortedCategories(tempCategories)
    }, [categories])

    // deletes posts
    const delPost = (postId) => {
        deletePost(postId)
            .then(() => getPosts().then(setPosts))
    }


    return (
        <article className="postlist">
            <h2>All posts</h2>
            <form className="categoryFilterForm">
                <fieldset className="categoryFilterForm__fieldset">
                    <div className="formgrid">
                        <select 
                            name="category" 
                            id="category" 
                            className="form__input" 
                            onChange={handleChange}>
                            <option value="">Select Category</option>
                            {categories.map(category => <option key={category.id} value={category.id}>{category.label}</option>)}
                        </select>
                        <button 
                            type="button"
                            className="filterBtn"
                            onClick={()=> {handleFilter(parseInt(filterCategoryId))}}>
                                Filter
                        </button>
                    </div>
                </fieldset>
                <fieldset className="categoryFilterForm__fieldset">
                    <div className="formgrid">
                        <select 
                            name="user" 
                            id="user" 
                            className="form__input" 
                            onChange={handleChange}>
                            <option value="">Select User</option>
                            {users.map(user => <option key={user.id} value={user.id}>{user.user.username}</option>)}
                        </select>
                        <button 
                            type="button"
                            className="filterBtn"
                            onClick={()=> {handleFilter(parseInt(filterUserId))}}>
                                Filter
                        </button>
                    </div>
                </fieldset>
                <fieldset className="categoryFilterForm__fieldset">
                    <div className="formgrid">
                        <input
                            type="text"
                            id="search"
                            placeholder="Search by title"
                            onChange={handleChange}>
                        </input>
                        <button 
                            type="button"
                            className="filterBtn"
                            onClick={()=> {handleSearch(searchValue)}}>
                                Search
                        </button>
                    </div>
                </fieldset>
                {/* <fieldset className="categoryFilterForm__fieldset">
                    <div className="formgrid">
                        <button
                            type="submit"
                            className="filterBtn"
                            id="resetBtn"
                            onClick={()=> {handleReset}}>
                                Reset
                        </button>
                    </div>
                </fieldset> */}
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
