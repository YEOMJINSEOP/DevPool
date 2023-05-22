import { useEffect, useState } from 'react';
import styles from './CommentBox.module.css';
import { time } from 'console';

type CommentBoxProps = {
  teamId: number;
}

type Reply = {
  replyId: number;
  text: string;
}

type Comment = {
  teamId: number;
  commentId: number;
  text: string;
  replies: Reply[];
}

function CommentBox(props: CommentBoxProps): JSX.Element {
  const [comment, setComment] = useState<Comment[]>([{
    "teamId": 1,
    "commentId": 1,
    "text": "This is a comment.",
    "replies": [
      {
        "replyId": 2,
        "text": "This is a reply to the first comment."
      },
      {
        "replyId": 3,
        "text": "This is another reply to the first comment."
      }
    ]
  },
  {
    "teamId": 1,
    "commentId": 2,
    "text": "This is a comment.2",
    "replies": [
      {
        "replyId": 2,
        "text": "This is a reply to the first comment."
      },
      {
        "replyId": 3,
        "text": "This is another reply to the first comment."
      }
    ]
  },
])

const [commentInput, setCommentInput] = useState<string>('');

const handleCommentInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  setCommentInput((prev) => event.target.value);
}

const handleAddComment = () => {
  // ✅ 새로운 댓글을 추가하는 API가 필요.
  // POST 요청.
  // 매개변수로는 /:teamId
  // 전달되는 JSON 데이터
  // {
  //  teamId: props.teamId,  
  //  text: commentInput,
  //  replies: []
  //}
  setComment((prev) => [...prev, {
    teamId: Date.now(),
    commentId: Date.now(),
    text: commentInput,
    replies: []
  }]);
  setCommentInput('');
  console.log(commentInput);
  setCommentUpdate(true);
}

const [commentUpdate, setCommentUpdate] = useState<boolean>(false);

  useEffect(() => {
    // ✅ teamId를 매개변수로 넘겨주고, 해당되는 comment를 get 하는 API 필요 => setComment

    setCommentUpdate(false);
  }, [commentUpdate])

  return (
    <div className={styles.commentBoxContainer}>
      <div className={styles.commentBox}>
        <div className={styles.commentHeader}>
          <input className={styles.inputComment} type="text" value={commentInput} onChange={handleCommentInput}/>
          <button className={styles.addBtn} onClick={handleAddComment}>댓글 달기</button>
        </div>
        <ul className={styles.commentList}>
          {
            comment.map(
              cmnt => {
                return (
                  <li className={styles.commentContainer} key={cmnt.commentId}>
                    <div className={styles.comment}>
                      <div className={styles.userImg}></div>
                      <span className={styles.commentText}>{cmnt.text}</span>
                    </div>
                    <ul>
                      {cmnt.replies.map((reply) =>
                        {return (
                          <li className={styles.reply} key={reply.replyId}>
                            <div className={styles.userImg}></div>
                            <span className={styles.replyText}>{reply.text}</span>
                          </li>
                        )}
                      )}
                    </ul>
                  </li>
                )
              }
            )
          }
        </ul>
      </div>
    </div>
  );
}

export default CommentBox;