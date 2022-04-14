import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Header from "../../layout/Header/Header";
import "./UserAccount.css";
import Avatar from "../../components/shared/Avatar/Avatar";
import { useSelector } from "react-redux";
import { currentUserSel } from "../../store/currentUser";
import { camera } from "../../assets/icon";

export default function User() {
  const user = useSelector(currentUserSel.currentUserSelector);
  const [photo, setPhoto] = React.useState("");

  const updateData = async (url: string, method: string, body: any) => {
    try {
      const res = await fetch(url, {
        method,
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  const uploadFile = (event: { target: { files: any } }) => {
    let file = event.target.files[0];
    if (file) {
      let data = new FormData();
      data.append("my-file", file);
      updateData(
        "http://localhost:8000/api/v1/auth/uploadPhoto",
        "POST",
        data
      ).then((data) => {
        setPhoto(data.photoData);
      });
    }
  };

  return (
    <>
      <Header />
      <div className="user-profile">
        <Card sx={{ width: 1000, height: 500 }}>
          <CardHeader
            sx={{
              height: 300,
              backgroundImage: "url(user-background-cover.png)",
            }}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardContent sx={{ position: "relative" }}>
            <input
              type="file"
              className="user-photo-upload"
              name="my-file"
              multiple
              onChange={uploadFile}
              title=""
            />
            <div className="camera">{camera()}</div>
            <Avatar width="150px" height="150px" photo={photo} />
            <Typography variant="body2" color="text.secondary">
              {user?.name}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
