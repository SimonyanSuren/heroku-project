import { FunctionComponent } from "react";
import Posts from "../../components/Posts/Posts";
import "./Home.css";
import Header from "../../layout/Header/Header";

const Home: FunctionComponent<any> = ({users}) => {
  return (
    <>
      <Header />
      <div className="home">
        <div className="posts-container">
          <Posts url={`${process.env.REACT_APP_ROOT_API}/posts/get/?`} users={users}/>
        </div>
      </div>
    </>
  );
};

export default Home;
