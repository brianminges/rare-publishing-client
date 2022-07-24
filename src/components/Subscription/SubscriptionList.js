import React, { useEffect, useState } from "react";
// import { getSubscriptions } from "./SubscriptionManager";
import { PostCard } from "../post/PostCard";
import { getPostsByUserSubscription } from "../post/PostManager";
import "./../post/PostList.css"

export const SubscriptionList = () => {

    // const [subs, setSubs] = useState([]);
    const [posts, setPosts] = useState([]);
 
    // const loadSubs = () => {
    //     getSubscriptions()
    //         .then(data => setSubs(
    //         //     {
    //         //     id: data.id,
    //         //     createdOn: data.created_on,
    //         //     endedOn: data.ended_on,
    //         //     authorId: data.author.id,
    //         //     followerId: data.follower.id
    //         // }
    //         data
    //         ))
    // }

    const loadPosts = () => {
        getPostsByUserSubscription()
            .then(data => setPosts(data))
    }

    useEffect(() => {
        // setTimeout(() => loadSubs(), 500)
        setTimeout(() => loadPosts(), 250)
    }, [])
 
    useEffect(() => {
        console.log('posts', posts)
        // console.log('subs', subs)
    }, [posts])

    // sorts all posts with most recent at top of page
    const [sortedPosts, setSortedPosts] = useState([]);

    useEffect(() => {
        const tempPosts = posts.sort((a,b) => (a.publication_date < b.publication_date) ? 1 : -1)
        setSortedPosts(tempPosts)
    }, [posts])

    if (posts.length < 1)
        return (
            <article>
                <div className="postlist__empty">
                    <h3><strong>Subscribe to authors to curate your personal homepage</strong></h3>
                </div>
            </article>
        )
    else
        return ( 
 
            <article className="postlist">
                <h2>Subscribed posts</h2>
                {posts.map(post => 
                    <PostCard
                    key={post.id}
                    post={post}
                    />
                )}
            </article>
        )
}