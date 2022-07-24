const remoteURL = "http://localhost:8000"

export const createComment = (comment) => {
    return fetch(`${remoteURL}/comments`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
        .then(response => response.json())
}

export const deleteComment = (id) => {
    return fetch(`${remoteURL}/comments/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}

export const getCommentsByUser = () => {
    return fetch(`${remoteURL}/posts/my_comments`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}