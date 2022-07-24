import react, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserById } from "./UserManager";
import { createSubscription, getSubscriptions, getSubscriptionsBySubscribedTo, deleteSubscription } from "../Subscription/SubscriptionManager";
import "./UserDetail.css"

export const UserDetail = () => {
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory();
    const loggedInUserId = parseInt(localStorage.getItem("userId"));
    let {userId} = useParams();
    userId = parseInt(userId);
    const [user, setUser] = useState([]);

    const loadUser = () => {
        getUserById(userId)
            .then(data =>
                setUser(
                {
                    id: parseInt(data.id),
                    firstName: data.user?.first_name,
                    lastName: data.user?.last_name,
                    username: data.user?.username,
                    bio: data.bio,
                    profileImage: data.profile_image_url,
                    createdOn: data.user?.date_joined
                }
                ))
    }
    
    useEffect(() => {
        setTimeout(() => loadUser(), 500)
    }, [])

       // Changes date from yyyy-MM-dd to weekday, month date, year
    const changeDateFormat = (inputDate) => {
        let date = new Date(inputDate);
        
        return date.toLocaleString('en-US', {
            day: 'numeric', // numeric, 2-digit
            year: 'numeric', // numeric, 2-digit
            month: 'long', // numeric, 2-digit, long, short, narrow
        });
       
    }

    const formattedDate = changeDateFormat(user.createdOn)

    let todayDate = new Date()
    const dd = String(todayDate.getDate()).padStart(2, '0')
    const mm = String(todayDate.getMonth() +1).padStart(2, '0')
    const yyyy = todayDate.getFullYear()
    todayDate = `${yyyy}-${mm}-${dd}`
    todayDate = todayDate.toString()

    const handleSubscribe = () => {

        const newSub = {
            follower: loggedInUserId,
            author: parseInt(userId),
            created_on: todayDate,
            ended_on: "2222-12-30"
        }
        
        createSubscription(newSub)
        .then(() => history.push("/"))
    }

    const handleUnsubscribe = (id) => {
        console.log(id)
        deleteSubscription(id)
        .then(() => history.push("/"))
    }
 
    //Lines 69-89 set state for 'isSubscribed', which sets state for buttons ternary
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [subscribedTo, setSubscribedTo] = useState([]);
    const [subToBeDeleted, setSubToBeDelete] = useState([])
    
    useEffect(() => {
        getSubscriptionsBySubscribedTo()
            .then(data => (setSubscribedTo(data)))
    }, [])

    useEffect(() => {
        subscribedTo.forEach(sub => {
            if (userId === sub.author.id && loggedInUserId === sub.follower.id) {
            setIsSubscribed(true)
            setSubToBeDelete(sub)
            // console.log('true')
            console.log('isSubscribed', isSubscribed)
            }
            // else
            //     setIsSubscribed(false)
            //     // console.log('false')
        })
    }, [subscribedTo])

    useEffect(() => {
        console.log('subToBeDeleted', subToBeDeleted)
    }, [subToBeDeleted])


    if (user?.profileImage)
        return (
            <>
            <article className="userdetail">
                <h2>{user?.firstName} {user?.lastName}</h2>
                <div>
                    <div className="user__layout">
                        <div className="user__layout__left">
                            <img src={user?.profileImage} alt="a picture of this user" className="profile__picture"/>
                        </div>
                        <div className="user__layout__right">
                            <p><span className="userdetail__category">Username:</span> {user?.username}</p>
                            <p><span className="userdetail__category">Joined:</span> {formattedDate}</p>
                            <p><span className="userdetail__category">About {user?.firstName}:</span> {user?.bio}</p>
                        </div>
                    </div>
                    <div className="user__layout__buttons">
                        {
                            isSubscribed === true ?
                                <button
                                    type="submit"
                                    className="user__layout__button__unsubscribe"
                                    onClick={() => {handleUnsubscribe(subToBeDeleted.id)}}   
                                    >
                                Unsubscribe
                                </button> 
                            :
                                <button
                                    type="submit"
                                    className="user__layout__button"
                                    onClick={handleSubscribe} 
                                    >
                                Subscribe
                                </button> 
                        }
                    </div>
                </div>

            </article>
            </>
        )
    else
        return (
        <>
        <article className="userdetail">
            <h2>{user?.firstName} {user?.lastName}</h2>
            <div>
                <div className="user__layout">
                    <div className="user__layout__right">
                        <p><span className="userdetail__category">Username:</span> {user?.username}</p>
                        <p><span className="userdetail__category">Joined:</span> {formattedDate}</p>
                        <p><span className="userdetail__category">About {user?.firstName}:</span> {user?.bio}</p>
                        <div className="user__layout__buttons">
                        {
                            isSubscribed === true ?
                                <button
                                        type="submit"
                                        className="user__layout__button__unsubscribe"
                                        onClick={() => {handleUnsubscribe(subToBeDeleted.id)}}  
                                        >
                                Unsubscribe
                                </button> 
                            :
                                <button
                                    type="submit"
                                    className="user__layout__button"
                                    onClick={handleSubscribe}  
                                    >
                                Subscribe
                                </button> 
                        }
                        </div>
                    </div>
                </div>
            </div>

        </article>
        </>
    )
    
}
 