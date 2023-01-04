import React, { useState } from "react";

const NewPost = ({token, posts, setPosts}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState("");
  const cohortName = "2209-FTB-ET-WEB-AM";

  const handleSubmit = async (ev) => {
    try {
    ev.preventDefault();
    window.localStorage.setItem("token", token);
    //console.log('title, description, price, location: ', title, description, price, location);
    const response = await fetch(`https://strangers-things.herokuapp.com/api/${cohortName}/posts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
    });
    const data = await response.json();
    //console.log('data: ', data);
    //console.log(data);
    //console.log(response);
    setPosts([data, ...posts]);
    setTitle('');
    setDescription('');
    setPrice('');
    setWillDeliver('');
    setLocation('');
  }catch (error){
    console.error(error);
  }
}
  
return (
    <div className="newPost">
      <h3>Create a Post</h3>
      <form onSubmit={handleSubmit} className="information">
        <input
          placeholder="title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        ></input>
        <input
          placeholder="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></input>
        <input
          placeholder="price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        ></input>
         <input
          placeholder="will deliver"
          value={willDeliver}
          onChange={(ev) => setWillDeliver(ev.target.value)}
        ></input>
        <input
          placeholder="location"
          value={location}
          onChange={(ev) => setLocation(ev.target.value)}
        ></input>
        <button>Create Post</button>
      </form >
    </div>
  );
};

export default NewPost;
