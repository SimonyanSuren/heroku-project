import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Post from "../Post/Post";
import { Ipost } from "../../APIResponseTypes";
import React from "react";
import transformDataByIds from "../../helpers/dataByIdsTransformer";
import { useSelector } from "react-redux";
import { currentUserSel } from "../../store/currentUser";
import { Card } from "@mui/material";
import updateData from "../../services/api/updateData.api";
import Loader from "../shared/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import NewPost from "../NewPost/NewPost";
interface IProps {
  url: string;
  searchedPosts: any;
  newPost: boolean;
}
interface FavoriteById {
  id?: Ipost;
}
const Posts: FunctionComponent<IProps> = ({ url, searchedPosts, newPost }) => {
  const user = useSelector(currentUserSel.currentUserSelector);
  const [postsCount, setPostsCount] = useState(0);
  const [posts, status, setStatus, setPosts, end] = useFetch(
    `${process.env.REACT_APP_ROOT_API}${url}?limit=${10}&offset=${postsCount}`
  );

  const [favorites] = useFetch(
    `${process.env.REACT_APP_ROOT_API}favoritePosts/getAll`
  );
  interface Ifavorites {
    [key: number]: Ipost;
  }

  const [favoritesByIds, setFavoritesByIds] = useState({} as Ifavorites);

  useEffect(() => {
    const favoritePostsByIds = transformDataByIds(favorites);
    setFavoritesByIds(favoritePostsByIds);
  }, [favorites]);

  useEffect(() => {
    setPosts(searchedPosts);
  }, [searchedPosts]);

  const addPost = (newPost: string) => {
    if (newPost.trim().length) {
      setStatus("loading");
      updateData(`${process.env.REACT_APP_ROOT_API}posts/create`, "POST", {
        body: newPost,
        user: user,
      }).then((data) => {
        setPosts([{ ...data, user: user }, ...posts]);
        setStatus("success");
      });
    }
  };

  const showMore = () => {
    setStatus("more");
    setPostsCount(postsCount + 10);
  };

  const handleFavorite = (obj: { id: number; post: Ipost }) => {
    if (favoritesByIds[obj.id]) {
      delete favoritesByIds[obj.id];
    } else favoritesByIds[obj.id] = obj.post;
    setFavoritesByIds({ ...favoritesByIds });
  };

  const deletePost = useCallback(
    (uuid: string) => () => {
      setStatus("loading");
      updateData(
        `${process.env.REACT_APP_ROOT_API}/posts/delete/${uuid}`,
        "DELETE",
        {}
      ).then((data: any) => {
        setPosts(posts.filter((post: { uuid: string }) => post.uuid !== uuid));
        setStatus("success");
      });
    },
    [posts]
  );


  

  return (
    <>
      {user && newPost && (
        <div className="new-post">
          <Card
            sx={{
              width: 550,
              minHeight: 100,
              borderRadius: "12px",
            }}
          >
            <NewPost hanldeNewPost={addPost} type="post" />
          </Card>
        </div>
      )}
      {status === "loading" && <Loader />}
      {posts?.map((post: Ipost) => (
        <Post
          handleFavorite={handleFavorite}
          key={post.uuid}
          deletePost={deletePost}
          post={post}
          isfavorite={!!favoritesByIds[post.id]}
        />
      ))}
      {!posts?.length ? (
        <p className="no-posts">No posts yet!</p>
      ) : (
        !end &&
        !searchedPosts &&
        posts.length > 9 && (
          <p className="more-posts" onClick={showMore}>
            Show more
          </p>
        )
      )}
    </>
  );
};
export default Posts;
