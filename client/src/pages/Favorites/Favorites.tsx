import { useSelector } from "react-redux";
import { Ipost } from "../../APIResponseTypes";
import Post from "../../components/Post/Post";
import Header from "../../layout/Header/Header";
import "./Favorites.css";

export default function Favorites({ users }: any) {
  // const [favorites, status, setFavorites] = useFetch(
  //   "http://localhost:8000/api/v1/posts/getAll",
  // ); //must be favorites url
  return (
    <>
      <Header />
      <div className="favorites">
        {/* {favorites.map((favorite: Ipost) => (
          <Post
            post={favorite}
            isfavorite={true}
            user={users[favorite.userId]}
          />
        ))} */}
      </div>
    </>
  );
}
