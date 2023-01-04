import React from "React";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AllPosts from "./AllPosts";

const PostDetails = (props) => {
  const posts = props.posts;
  const postDetail = props.postDetail;
  const params = useParams();
  const id = params.id;
  const post = posts.find((post) => post._id === id);
  const setPostId = props.setPostId;
  const token = props.token;

  //console.log(id);
  //console.log(postDetails);

  if (!post) {
    return null;
  }
  if (post.active)
   {
    const deletePost= (id) => {
      fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${id}`, {
              method: "DELETE",
              headers: {
                   'Content-Type': 'application/json',
                   'Authorization': `Bearer ${token}`
              }
           })
              .then(response => response.json())
              .then(result => {
               console.log(result);
              AllPosts();
            })
           .catch(console.error);
       };

  return (
    <div className="postDetails" >
      <h6>
        <Link to="/posts">Go Back</Link>
      </h6>
      <div className="postDetails-form">
        <h3 className="title">{post.title}</h3>
        <p className="description">description: {post.description}</p>
        <p className="price">price: {post.price}</p>
        <p className="willDeliver">will deliver: {post.willDeliver}</p>
        <p className="location">location: {post.location}</p>
        <button className="edit-btn" onClick={() => setPostId(post._id)}>Edit</button>
        <button className= 'delete-btn' onClick = { () => deletePost(post._id) }> Delete </button> 
      </div>
    </div>
        )
  }};
export default PostDetails;
