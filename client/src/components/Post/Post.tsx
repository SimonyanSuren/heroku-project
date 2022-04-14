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
import { pink } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import { Ipost } from "../../APIResponseTypes";
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
import useOutsideClick from "../../hooks/useOutsideClick";

const Post: FunctionComponent<any> = ({
  post,
  isfavorite,
  deletePost,
  handleFavorite,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [postBody, setPostBody] = useState(post.body);
  const [postDraft, setPostDraft] = useState(post.body);

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  const currentUser = useSelector(currentUserSel.currentUserSelector);
  const dropdownRef: React.MutableRefObject<null | HTMLDivElement> =
    React.useRef(null);
  const [dropDownOpen, setDropDownOpen] = useOutsideClick(false, dropdownRef);

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
    const method = isfavorite ? "DELETE" : "POST";
    let url = isfavorite ? `remove` : "addToFavourites";
    updateData(
      `${process.env.REACT_APP_ROOT_API}favoritePosts/${url}`,
      method,
      { postId: post.id }
    );
    handleFavorite({ id: post.id, post });
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
            <Link
              to={
                post.user?.id === currentUser?.id
                  ? `/${currentUser?.name}`
                  : `/profile/${post.user?.name}`
              }
              state={post.user}
            >
              <Avatar width="40px" height="40px" />
            </Link>
          }b
          action={
            currentUser &&
            post.user?.id === currentUser?.id && (
              <div ref={dropdownRef}>
                <IconButton aria-label="settings" onClick={toggleDropDown}>
                  <MoreVertIcon />
                  <aside
                    className={`acc-view ` + (dropDownOpen ? "" : "d-none")}
                  >
                    <div className="post-settings">
                      <ul className="post-settings-list">
                        <li className="post-settings-item" onClick={toggleEdit}>
                          <IconButton>
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
                  </aside>
                </IconButton>
              </div>
            )
          }
          title={post.user?.id === currentUser?.id ? "me" : post.user?.name}
          subheader={post?.createdAt
            .toString()
            .slice(0, 10)
            .split("-")
            .join(" ")}
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
            <div className="multiline">{postBody}</div>
          )}
        </CardContent>
        <CardActions disableSpacing>
          {currentUser && (
            <IconButton
              aria-label="add to favorites"
              onClick={toggleFavorite}
              sx={{ color: isfavorite ? pink[600] : "default" }}
            >
              <FavoriteIcon />
            </IconButton>
          )}
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
            <Comments id={post.id} />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default React.memo(Post);
