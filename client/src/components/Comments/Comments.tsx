import useFetch from "../../hooks/useFetch";
import { FunctionComponent, useCallback, useState } from "react";
import React from "react";
import NewPost from "../NewPost/NewPost";
import updateData from "../../services/api/updateData.api";
import Comment from "../Comment/Comment";
import { useSelector } from "react-redux";
import { currentUserSel } from "../../store/currentUser";

const Comments: FunctionComponent<any> = ({ id }) => {
  const [commentsCount, setCommentsCount] = useState(0);
  const user = useSelector(currentUserSel.currentUserSelector);
  const [comments, status, setStatus, setComments, end] = useFetch(
    `${
      process.env.REACT_APP_ROOT_API
    }comments/get/?q=${id}&limit=${5}&offset=${commentsCount}`
  );

  const addComment = (newComment: string) => {
    if (newComment.trim().length) {
      updateData(`${process.env.REACT_APP_ROOT_API}comments/create`, "POST", {
        body: newComment,
        postId: id,
        user,
      }).then((data) => {
        setComments([{ ...data, user }, ...comments]);
      });
    }
  };

  const showMore = () => {
    if (!end) {
      setStatus("more");
      setCommentsCount(commentsCount + 5);
    }
  };

  const deleteComment = useCallback(
    (uuid: string) => () => {
      setStatus("loading");
      updateData(
        `${process.env.REACT_APP_ROOT_API}/comments/delete/${uuid}`,
        "DELETE",
        {}
      ).then((data: any) => {
        setComments(
          comments.filter(
            (comments: { uuid: string }) => comments.uuid !== uuid
          )
        );
        setStatus("success");
      });
    },
    [comments]
  );

  return (
    <>
      {user && <NewPost hanldeNewPost={addComment} type="comment" />}
      {comments?.map(
        (comment: { body: string; userId: number; id: number }) => (
          <Comment
            key={comment.id}
            comment={comment}
            deleteComment={deleteComment}
          />
        )
      )}
      {!end && (
        <p className="more-comments" onClick={showMore}>
          more
        </p>
      )}
    </>
  );
};

export default React.memo(Comments);