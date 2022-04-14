import { FunctionComponent, useState } from "react";
import Posts from "../../components/Posts/Posts";
import { useSelector } from "react-redux";
import { currentUserSel } from "../../store/currentUser";
import "./MyPosts.css";
import Header from "../../layout/Header/Header";
import getData from "../../services/api/getData.api";
import Footer from "../../layout/Footer/Footer";

const MyPosts: FunctionComponent<any> = () => {
  const user = useSelector(currentUserSel.currentUserSelector);
  const [serachedPosts, setSearchedPosts] = useState(null);
  const handleSearchValue = (value: string) => {
    getData(
      `${process.env.REACT_APP_ROOT_API}/posts/search?q=${user.id}&text=${value}`
    ).then((data) => {
      setSearchedPosts(data);
    });
  };
  return (
    <>
      <Header handleSearchValue={handleSearchValue} />
      <div className="my-posts">
        <div className="posts-container">
          <Posts
            newPost={true}
            url={`posts/get?`}
            searchedPosts={serachedPosts}
          />
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default MyPosts;
