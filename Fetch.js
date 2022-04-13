import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./Components/SearchBar";
const Fetch = () => {
  const [posts, setposts] = useState([]);
  const url = "https://jsonplaceholder.typicode.com/posts";
  useEffect(() => {
    axios.get(url).then((response) => {
      setposts(response.data);
    });
  }, []);
  const addpost = async () => {
    const post = { title: "add title", body: "add body" };
    await axios.post(url, post);
    setposts([post, ...posts]);
  };
  const handleupdate = async (post) => {
    post.title = "update the title";
    post.body = "update the body";
    await axios.put(url + "/" + post.id);
    const clone = [...posts];
    const index = clone.indexOf(post);
    clone[index] = { ...post };
    setposts(clone);
  };
  const handledelete = async (post) => {
    await axios.delete(url + "/" + post.id + post);
    setposts(posts.filter((p) => p.id !== post.id));
  };
  return (
    <div>
      <SearchBar placeholder="enter the title...." data={posts} />
      <h2>number of posts:{posts.length}</h2>
      <button onClick={addpost}>Add Post</button>
      <table>
        <thead>
          <tr>
            <th>TITLE</th>
            <th>BODY</th>
            <th>UPDATE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.body}</td>

                <td>
                  <button onClick={() => handleupdate(post)}>UPDATE</button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handledelete(post);
                    }}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Fetch;
