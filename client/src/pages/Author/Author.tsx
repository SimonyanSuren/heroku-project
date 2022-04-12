import { Card, CardContent, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Avatar from "../../components/shared/Avatar/Avatar";
import Header from "../../layout/Header/Header";
import { Ipost, Iuser } from "../../APIResponseTypes";
import "./Author.css";
import Posts from "../../components/Posts/Posts";

export default function Author({ users }: { users: any }) {
  const location = useLocation();
  const state: any = location.state;

  return (
    <>
      <Header />
      <div className="author">
        <Card
          sx={{
            maxWidth: 345,
            marginTop: "50px",
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "10px",
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
            url={`http://localhost:8000/api/v1/posts/get/?q=${state.id}&`}
            users={users}
          />
        </div>
      </div>
    </>
  );
}
