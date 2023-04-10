import React from "react";

const EditPost = (props) =>{
    const [isEdit, setEdit] = useState(false);
    const token = props.token;
    const cohortName = "2209-FTB-ET-WEB-AM";

    const editPost = async () => {
        fetch(`http://strangers-things.herokuapp.com/api/${cohortName}/posts/5e8d1bd48829fb0017d2233b`, {
  method: "PATCH",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    post: {
        title,
        description,
        price,
        willDeliver,
        location,
    }
  })
}).then(response => response.json())
  .then(result => {
    console.log(result);
  })
  .catch(console.error);

    }

return (
    <div>
<div className="editPost" >
      <div className="editPost-form">
        <h3 className="title">{post.title}</h3>
        <p className="description">description: {post.description}</p>
        <p className="price">price: {post.price}</p>
        <p className="willDeliver">will deliver: {post.willDeliver}</p>
        <p className="location">location: {post.location}</p>
        {post.author.username === user.username ? (<><button className="edit-btn" onClick={() => setEdit(!isEdit)}>Edit</button>
        </>)
        : null}
      </div>
    </div>
</div> 
)}
export default EditPost;