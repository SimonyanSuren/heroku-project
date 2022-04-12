import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import Post from '../Post/Post';
import { Ipost } from '../../APIResponseTypes';
import React from 'react';
import transformDataByIds from '../../helpers/dataByIdsTransformer';
import { useSelector } from 'react-redux';
import { currentUserSel } from '../../store/currentUser';
import { Box, Card, CardContent } from '@mui/material';
import Avatar from '../shared/Avatar/Avatar';
import updateData from '../../services/api/updateData.api';
import Loader from '../shared/Loader/Loader';
import useFetch from '../../hooks/useFetch';
import NewPost from '../NewPost/NewPost';
interface IProps {
  url: string;
  users: any;
}
interface FavoriteById {
  id?: Ipost;
}
const Posts: FunctionComponent<IProps> = ({ url }) => {
  const user = useSelector(currentUserSel.currentUserSelector);
  const [users] = useFetch("http://localhost:8000/api/v1/user/getAll");
  const [postsCount, setPostsCount] = useState(0);
  const [posts, status, setStatus, setPosts, end] = useFetch(
    `${url}limit=${10}&offset=${postsCount}`
  );
  const [alert, setAlert] = useState<string | null>(null);
  const [favorites, favStatus, setFavorites] = useFetch(
    'http://localhost:8000/api/v1/posts/getAll'
  );
  let favoritePostsByIds: FavoriteById | any;
  if (favorites) {
    favoritePostsByIds = transformDataByIds(favorites);
  }

  const usersByIds = transformDataByIds(users);

  const addPost = (newPost: string) => {
    if (newPost.trim().length) {
      setStatus('loading');
      updateData(`${process.env.REACT_APP_ROOT_API}/posts/create`, 'POST', {
        body: newPost,
        userId: user.id,
      }).then((data) => {
        setTimeout(() => {
         setPosts([data, ...posts]);
          setStatus('success');
        }, 500);
      });
    }
  };

  console.log(posts);
  

  const handleAlert = useCallback((msg: string) => {
    setAlert(msg);
  }, []);

  const showMore = () => {
    setStatus('more');
    setPostsCount(postsCount + 10);
  };

  const deletePost = useCallback(
    (uuid: string) => () => {
      setStatus('loading');
      updateData(
        `${process.env.REACT_APP_ROOT_API}/posts/delete/${uuid}`,
        'DELETE',
        {}
      ).then((data: any) => {
        setPosts(posts.filter((post: { uuid: string }) => post.uuid !== uuid));
        setStatus('success');
      });
    },
    [posts]
  );
  return (
    <>
      {user && (
        <div className="new-post">
          <Card
            sx={{
              width: 550,
              minHeight: 100,
              borderRadius: '12px',
            }}
          >
            <NewPost hanldeNewPost={addPost} type="post" />
          </Card>
        </div>
      )}
      {status === 'loading' && <Loader />}
      {posts?.map((post: Ipost) => (
        <Post
          key={post.id}
          users={users}
          deletePost={deletePost}
          // handleFavorite={handleFavorite}
          setAlert={handleAlert}
          post={post}
          // isfavorite={';
          //   // user ? (favoritePostsByIds[post.id] ? true : false) : false
          // }
          user={usersByIds[post.userId]}
        />
      ))}
      {!posts?.length ? (
        <p className="no-posts">No posts yet!</p>
      ) : (
        !end && (
          <p className="more-posts" onClick={showMore}>
            Show more
          </p>
        )
      )}
    </>
  );
};
export default Posts;
