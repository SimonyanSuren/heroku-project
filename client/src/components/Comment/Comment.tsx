import { Card, CardHeader, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import updateData from "../../services/api/updateData.api";
import DropDown from "../shared/DropDown/DropDown";
import Avatar from "../shared/Avatar/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { currentUserSel } from "../../store/currentUser";
import { Link } from "react-router-dom";

export default function Comment({
  comment,
  user,
  deleteComment,
}: {
  comment: any;
  user: any;
  deleteComment: Function;
}) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [commentBody, setCommentBody] = useState(comment.body);
  const [commentDraft, setCommentDraft] = useState(comment.body);

  const currentUser = useSelector(currentUserSel.currentUserSelector);  

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const toggleDropDownOutSide = () => {
    setDropDownOpen(false);
  };

  const editComment = () => {
    updateData("http://localhost:8000/api/v1/comments/edit", "PATCH", {
      body: commentBody,
      id: comment.id,
    }).then((data: any) => {
      setCommentBody(commentDraft);
      setIsEdit(false);
    });
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCommentDraft(event.target.value);
  };

  return (
    <Card
      sx={{ border: "none", backgroundColor: "transparent", boxShadow: "none" }}
    >
      <CardHeader
        sx={{ maxWidth: 500 }}
        avatar={
          <Link to={`/${user.name}`} state={user}>
            <Avatar width="40px" height="40px" />
          </Link>
        }
        action={
          currentUser &&
          user.id === currentUser.id && (
            <IconButton aria-label="settings">
              <MoreVertIcon onClick={toggleDropDown} />
              <DropDown
                className="r5"
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
                      onClick={deleteComment(comment.uuid)}
                    >
                      <IconButton>
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
        subheader={!isEdit && commentBody}
        title={user.id === currentUser?.id? "me": user.name}
      />
      {isEdit && (
        <>
          <TextField
            sx={{ width: 400, paddingRight: "25px" }}
            id="outlined-multiline-flexible"
            multiline
            maxRows={4}
            value={commentDraft}
            onChange={handleCommentChange}
          />
          <div className="edit-save-button" onClick={editComment}>
            <button className="btn-secondary">Add</button>
          </div>
        </>
      )}
    </Card>
  );
}
