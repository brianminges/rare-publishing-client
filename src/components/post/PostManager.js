const remoteURL = "http://localhost:8000"

export const getPosts = () => {
    return fetch(`${remoteURL}/posts`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getPostsByUser = () => {
    return fetch(`${remoteURL}/posts/my_posts`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getPostById = (postId) => {
    return fetch(`${remoteURL}/posts/${postId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getCategories = () => {
    return fetch(`${remoteURL}/categories`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getPostComments = (postId) => {
    return fetch(`${remoteURL}/posts/${postId}/comments`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const createPost = (post) => {
    return fetch(`${remoteURL}/posts`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
        .then(response => response.json())
}

export const deletePost = (id) => {
    return fetch(`${remoteURL}/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}

export const updatePost = (post, id) => {
    return fetch(`${remoteURL}/posts/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}

export const getPostByCategory = (categoryId) => {
    return fetch(`${remoteURL}/posts?category=${categoryId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getPostsByUserSubscription = () => {
    return fetch(`${remoteURL}/posts/subscribed`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}