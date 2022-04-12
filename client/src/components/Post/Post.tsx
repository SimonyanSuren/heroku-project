import { FunctionComponent } from "react";
import { useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "../shared/Avatar/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { pink } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import { Ipost } from "../../APIResponseTypes";
import DropDown from "../shared/DropDown/DropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Post.css";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import updateData from "../../services/api/updateData.api";
import { useSelector } from "react-redux";
import { currentUserSel } from "../../store/currentUser";
import { comment } from "../../assets/icon";
import Comments from "../Comments/Comments";

const Post: FunctionComponent<any> = ({
  post,
  isfavorite,
  users,
  user,
  handleFavorite,
  deletePost,
  setAlert,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [postBody, setPostBody] = useState(post.body);
  const [postDraft, setPostDraft] = useState(post.body);

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  const currentUser = useSelector(currentUserSel.currentUserSelector);

  //   useEffect(() => {
  //     if (favorite === false) {

  //     }
  //   }, [favorite]);

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(() => ({
    marginLeft: "auto",
    fontSize: "16px",
  }));

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const toggleDropDownOutSide = () => {
    setDropDownOpen(false);
  };

  const editPost = () => {
    if (postDraft) {
      updateData(`${process.env.REACT_APP_ROOT_API}/posts/edit`, "PATCH", {
        body: postBody,
        id: post.id,
      }).then((data: any) => {
        setPostBody(postDraft);
        setIsEdit(false);
      });
    } else {
      setIsEdit(false);
      setPostBody(postBody);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const toggleFavorite = () => {
    handleFavorite(post, !isfavorite);
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handlePostChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPostDraft(event.target.value);
  };

  return (
    <div className="post">
      <Card sx={{ width: 550, zIndex: "1", borderRadius: "12px" }}>
        <CardHeader
          avatar={
            <Link to="/author" state={user}>
              <Avatar width="40px" height="40px" />
            </Link>
          }
          action={
            currentUser &&
            user?.id === currentUser?.id && (
              <IconButton aria-label="settings" onClick={toggleDropDown}>
                <MoreVertIcon />
                <DropDown
                  open={dropDownOpen}
                  toggleDropDown={toggleDropDownOutSide}
                >
                  <div className="post-settings">
                    <ul className="post-settings-list">
                      <li className="post-settings-item" onClick={toggleEdit}>
                        <IconButton>
                          {" "}
                          <EditIcon style={{ fontSize: 20 }} />
                        </IconButton>
                        <span>Edit</span>
                      </li>
                      <li
                        className="post-settings-item"
                        onClick={deletePost(post.uuid)}
                      >
                        <IconButton>
                          {" "}
                          <DeleteIcon style={{ fontSize: 20 }} />
                        </IconButton>
                        <span>Delete</span>
                      </li>
                    </ul>
                  </div>
                </DropDown>
              </IconButton>
            )
          }
          title={user?.id === currentUser?.id ? "me" : user?.name}
          subheader="September 14, 2016"
        />
        <CardContent>
          {isEdit ? (
            <>
              <TextField
                sx={{ width: 550, paddingRight: "25px" }}
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                value={postDraft}
                onChange={handlePostChange}
              />
              <div className="edit-save-button" onClick={editPost}>
                <button className="btn-secondary">Add</button>
              </div>
            </>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {postBody}
            </Typography>
          )}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={toggleFavorite}
            sx={{ color: isfavorite ? pink[600] : "default" }}
          >
            <FavoriteIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {comment()}
            <span>Comments</span>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Comments id={post.id} users={users} />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default React.memo(Post);
