import { FunctionComponent } from "react";
import Posts from "../../components/Posts/Posts";
import { useSelector } from "react-redux";
import { currentUserSel } from "../../store/currentUser";
import "./MyPosts.css";
import Header from "../../layout/Header/Header";

const MyPosts: FunctionComponent<any> = ({users}: {users:any}) => {
  const user = useSelector(currentUserSel.currentUserSelector);

  return (
    <>
      <Header />
      <div className="my-posts">
        <div className="posts-container">
          <Posts url={`http://localhost:8000/api/v1/posts/get/?q=${user.id}&`} users={users}/>
        </div>
      </div>
    </>
  );
};

export default MyPosts;
