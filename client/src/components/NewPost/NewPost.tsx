import { Box, CardContent } from "@mui/material";
import { useState } from "react";
import Avatar from "../shared/Avatar/Avatar";

export default function NewPost({ hanldeNewPost, type }: { hanldeNewPost: any, type: string }) {
  const [newPost, setNewPost] = useState("");
  const handleChange = (e: any) => {
    setNewPost(e.target.value);
  };
  const addPost = () => {
    hanldeNewPost(newPost);
    setTimeout(() => {
      setNewPost("");
    }, 300);
  };
console.log(newPost);

  return (
    <>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="new-post-avatar">
            <Avatar width="50px" height="50px" />
          </div>
          <textarea
            className="new-post-input"
            placeholder="Start a post"
            onChange={handleChange}
            rows={10}
            value={newPost}
          ></textarea>
        </Box>
        <div className="new-post-btn" onClick={addPost}>
          <button className="btn-secondary-dark">Post</button>
        </div>
      </CardContent>
    </>
  );
}
