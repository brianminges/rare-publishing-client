const remoteURL = "http://localhost:8000"

export const createSubscription = (newSub) => {
    return fetch(`${remoteURL}/subscriptions`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSub)
    })
        .then(response => response.json())
}

export const getSubscriptions = () => {
    return fetch(`${remoteURL}/subscriptions`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

//This is used to check buttons for subscribed/unsubscribed
export const getSubscriptionsBySubscribedTo = () => {
    return fetch(`${remoteURL}/subscriptions/subscribed`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}


export const deleteSubscription = (id) => {
    return fetch(`${remoteURL}/subscriptions/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}

 