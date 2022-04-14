import { Card, CardContent, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Avatar from '../../components/shared/Avatar/Avatar';
import Header from '../../layout/Header/Header';
import { Ipost, Iuser } from '../../APIResponseTypes';
import './Author.css';
import Posts from '../../components/Posts/Posts';
import getData from '../../services/api/getData.api';
import { useState } from 'react';
import Footer from '../../layout/Footer/Footer';

export default function Author() {
  const location = useLocation();
  const state: any = location.state;
  const [serachedPosts, setSearchedPosts] = useState(null);
  const handleSearchValue = (value: string) => {
    getData(
      `${process.env.REACT_APP_ROOT_API}/posts/search?text=${value}`
    ).then((data) => {
      setSearchedPosts(data);
    });
  };

  

  return (
    <>
      <Header handleSearchValue={handleSearchValue} />
      <div className="author">
        <Card
          sx={{
            maxWidth: 345,
            marginTop: '150px',
            marginLeft: '150px',
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '12px',
            paddingTop: '10px',
          }}
        >
          <Avatar width="100px" height="100px" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {state.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {state.email}
            </Typography>
          </CardContent>
        </Card>
        <div className="author-posts">
          <Posts
            newPost={false}
            searchedPosts={serachedPosts}
            url={`posts/getAll/?q=${state.id}&`}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
