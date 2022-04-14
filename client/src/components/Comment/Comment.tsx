import { Card, CardHeader, IconButton, TextField } from "@mui/material";
import { useState, useRef } from "react";
import updateData from "../../services/api/updateData.api";
import Avatar from "../shared/Avatar/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { currentUserSel } from "../../store/currentUser";
import { Link } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function Comment({
  comment,
  deleteComment,
}: {
  comment: any;
  deleteComment: Function;
}) {
  const dropdownRef: React.MutableRefObject<null | HTMLDivElement> =
    useRef(null);
  const [dropDownOpen, setDropDownOpen] = useOutsideClick(false, dropdownRef);
  const [isEdit, setIsEdit] = useState(false);
  const [commentBody, setCommentBody] = useState(comment.body);
  const [commentDraft, setCommentDraft] = useState(comment.body);

  const currentUser = useSelector(currentUserSel.currentUserSelector);

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const editComment = () => {
    updateData(`${process.env.REACT_APP_ROOT_API}/comments/edit`, "PATCH", {
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
          <Link to={`/${comment.user?.name}`} state={comment.user}>
            <Avatar width="40px" height="40px" />
          </Link>
        }
        action={
          currentUser &&
          comment.user?.id === currentUser?.id && (
            <div ref={dropdownRef}>
              <IconButton aria-label="settings">
                <MoreVertIcon onClick={toggleDropDown} />
              </IconButton>
              <aside className={`acc-view ` + (dropDownOpen ? "" : "d-none")}>
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
              </aside>
            </div>
          )
        }
        subheader={<div className="multiline">{!isEdit && commentBody}</div>}
        title={comment.user?.id === currentUser?.id ? "me" : comment.user?.name}
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
