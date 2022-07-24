import React from "react"
import { Route } from "react-router-dom"
import { PostDetail } from "./post/PostDetail"
import { PostForm } from "./post/PostForm"
import { PostList } from "./post/PostList"
import { UserPostList } from "./post/UserPostList"
import { PostEditForm } from "./post/PostEditForm"
import { CategoryList } from "./category/CategoryList"
import { PostDetailComment } from "./post/PostDetailComment"
import { UpdateCategoryForm } from "./category/UpdateCategory"
import { CommentForm } from "./comment/CommentForm"
import { UserList } from "./user/UserList"
import { UserDetail } from "./user/UserDetail"
import { SubscriptionList } from "./Subscription/SubscriptionList"

export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/">
        <SubscriptionList />
      </Route>
      <Route exact path="/posts">
        <PostList />
      </Route>
      <Route exact path="/posts/new">
        <PostForm />
      </Route>
      <Route exact path="/posts/:postId/edit">
      <PostEditForm />
      </Route>
      <Route exact path="/posts/my_posts/:postId/edit">
      <PostEditForm />
      </Route>
      <Route exact path="/posts/my_posts">
        <UserPostList />
      </Route>
      <Route exact path="/posts/:postId(\d+)">
        <PostDetail />
      </Route>
      <Route exact path="/posts/:postId(\d+)/comments">
        <PostDetailComment />
      </Route>
      <Route exact path="/my_posts/:postId(\d+)">
        <PostDetail />
      </Route>
      <Route exact path="/categories">
        <CategoryList />
      </Route>
      <Route exact path="/categories/:categoryId/edit">
        <UpdateCategoryForm />
      </Route>
      <Route exact path="/my_posts/:postId(\d+)/comments">
        <PostDetailComment />
      </Route>
      <Route exact path="/posts/comments/new/:postId(\d+)">
        <CommentForm />
      </Route>
      <Route exact path="/users">
        <UserList />
      </Route>
      <Route exact path="/users/:userId(\d+)">
        <UserDetail />
      </Route>
    </>
  )
}