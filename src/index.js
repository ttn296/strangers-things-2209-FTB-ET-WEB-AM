import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { AllPosts, PostDetails, Login, Register, NewPost, Update } from "./components";

const Nav = (props) => {
  const posts = props.posts;
  const user = props.user;
  
  return (
    <nav>
      <Link to="/posts">Posts ({posts.length}) </Link>
      <Link to="/newPost">Add New Post</Link>
      <Link to="/login">{user.username ? "Log Out" : "Log In"}</Link>
      <Link to="/register">Register</Link>
    </nav>  
  );
};

const App = () => {
  const cohortName = "2209-FTB-ET-WEB-AM";
  const url = `https://strangers-things.herokuapp.com/api/${cohortName}/`;

  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  const exchangeTokenForUser = () => {
    const token = window.localStorage.getItem("token");
    //console.log(token);
    setToken(token);
    if (token) {
      //console.log(token);
      fetch(
        `https://strangers-things.herokuapp.com/api/${cohortName}/users/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          const user = result.data;
          //console.log(user);
          setUser(user);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    exchangeTokenForUser();

  }, [token]);

  useEffect(() => {
    fetch(`${url}posts`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPosts(json.data.posts);
      });
  }, []);

  return (
    <div>
      <h1 className="container">Stranger's Things</h1>
      {user.username ? <h3 className="username">Welcome: {user.username} </h3> : null }
      <Nav posts={posts} user={user}/>
    
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts/:id" element={<PostDetails posts={posts} setPostId={setPostId} />} />
        <Route path="/posts" element={<AllPosts posts={posts} />} />
        <Route
          path="/login"
          element={<Login exchangeTokenForUser={exchangeTokenForUser}
          user={user} setUser={setUser} />}
        />
        <Route path="/register" element={<Register/>} />
        <Route path="/newpost" element={<NewPost posts={posts} setPosts={setPosts} token={token} />} />  
        <Route path="/update" element={<Update posts={posts} setPosts={setPosts} postId={postId} setPostId={setPostId} />} />
        </Routes>
    </div>
  );
};
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
