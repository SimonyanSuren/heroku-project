import { useState } from "react";
import Posts from "../../components/Posts/Posts";
import Footer from "../../layout/Footer/Footer";
import Header from "../../layout/Header/Header";
import getData from "../../services/api/getData.api";
import "./Favorites.css";

export default function Favorites() {
  const [serachedPosts, setSearchedPosts] = useState(null);
  const handleSearchValue = (value: string) => {
    getData(
      `${process.env.REACT_APP_ROOT_API}/favoritePosts/search?text=${value}`
    ).then((data) => {
      setSearchedPosts(data);
    });
  };
  return (
    <>
      <Header handleSearchValue={handleSearchValue} />
      <div className="favorites">
        { <Posts
          newPost={false}
          url={"favoritePosts/get"}
          searchedPosts={serachedPosts}
        /> }
      </div>
      <Footer/>
    </>
  );
}
