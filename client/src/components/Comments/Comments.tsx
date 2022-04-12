import useFetch from "../../hooks/useFetch";
import { FunctionComponent, useCallback, useState } from "react";
import React from "react";
import NewPost from "../NewPost/NewPost";
import updateData from "../../services/api/updateData.api";
import Comment from "../Comment/Comment";
import transformDataByIds from "../../helpers/dataByIdsTransformer";

const Comments: FunctionComponent<any> = ({ id, users }) => {
  const [commentsCount, setCommentsCount] = useState(0);
  const [comments, status, setStatus, setComments, end] = useFetch(
    `${process.env.REACT_APP_ROOT_API}/comments/get/?q=${id}limit=${10}&offset=${commentsCount}`
  );

  const usersByIds = transformDataByIds(users);

  const addComment = (newComment: string) => {
    if (newComment.trim().length) {
      updateData("http://localhost:8000/api/v1/comments/create", "POST", {
        body: newComment,
        postId: id,
      }).then((data) => {
        console.log(data);

        setComments([data, ...comments]);
      });
    }
  };

  const showMore = () => {
    setStatus("more");
    setCommentsCount(commentsCount + 10);
  };

  const deleteComment = useCallback(
    (uuid: string) => () => {
      setStatus("loading");
      updateData(
        `http://localhost:8000/api/v1/comments/delete/${uuid}`,
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
      <NewPost hanldeNewPost={addComment} type="comment" />
      {comments?.map(
        (comment: { body: string; userId: number; id: number }) => (
          <Comment
            key={comment.id}
            comment={comment}
            user={usersByIds[comment.userId]}
            deleteComment={deleteComment}
          />
        )
      )}
      {!end && (
        <p className="more-comments" onClick={showMore}>
          Show more
        </p>
      )}
    </>
  );
};

export default React.memo(Comments);
