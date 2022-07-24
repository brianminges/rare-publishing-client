const remoteURL = "http://localhost:8000"

export const getAllUsers = () => {
    return fetch(`${remoteURL}/users`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getUserById = (id) => {
    return fetch(`${remoteURL}/users/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}