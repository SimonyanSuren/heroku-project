import { FunctionComponent, useState } from "react";
import Posts from "../../components/Posts/Posts";
import "./Home.css";
import Header from "../../layout/Header/Header";
import getData from "../../services/api/getData.api";
import Footer from "../../layout/Footer/Footer";

const Home: FunctionComponent<any> = () => {
  const [serachedPosts, setSearchedPosts] = useState(null);

  const handleSearchValue = (value: string) => {
    getData(
      `${process.env.REACT_APP_ROOT_API}posts/search?text=${value}`
    ).then((data) => {
      
      setSearchedPosts(data);
    });
  };

  return (
    <>
      <Header handleSearchValue={handleSearchValue} />
      <div className="posts-header"></div>
      <div className="home">
        <div className="posts-container">
          <Posts
          newPost={true}
            url={`posts/getAll?`}
            searchedPosts={serachedPosts}
          />
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
