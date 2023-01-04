import React, { useState } from "react";

const Update = ({posts, setPosts, postId, setPostId}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const cohortName = "2209-FTB-ET-WEB-AM";

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log ('title, description: ', title, description, price, location);
    console.log('postId: ', postId);
    const response = await fetch(`http://strangers-things.herokuapp.com/api/${cohortName}/posts/5e8d1bd48829fb0017d2233b`, {
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
            location,
          }
        })
      });
      const data = await response.json();
      console.log('data: ', data);
      if(data && data.title ){
        const newPosts = posts.map(post => {
            console.log(newPosts);
            if(post._id === postId) {
                return data;
            }else {
                return post;
            }
        });
        setPosts([newPosts]);
        setTitle('');
        setDescription('');
        setPosts('');
        setLocation('');
        setPostId(null);
      }
  }

  return (
    <div>
        <h3>Update a Post</h3>
        <form onSubmit={handleSubmit}>
        <input type ="text"
          placeholder="title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        ></input>
        <input type ="text"
          placeholder="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></input>
        <input type ="text"
          placeholder="price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        ></input>
        <input type ="text"
          placeholder="location"
          value={location}
          onChange={(ev) => setLocation(ev.target.value)}
        ></input>
        <button type ="submit" className="update-btn">Update</button>
      </form >
    </div>
  )
}
export default Update;