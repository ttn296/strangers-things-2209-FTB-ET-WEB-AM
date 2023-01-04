import React from "react";
import { Link } from "react-router-dom";

const AllPosts = (props) => {
  const posts = props.posts;
  //console.log(posts);

  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post._id} className= {post.isAuthor ? "singlePost myPost" : "singlePost"}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
            <p className="description">description: {post.description}</p>
            <p className="price">price: {post.price}</p>
            <p className="willDeliver">will deliver: {post.willDeliver}</p>
            <p className="location">location: {post.location}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AllPosts;
