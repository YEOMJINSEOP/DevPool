import { useEffect, useState } from 'react';
import styles from './CommentBox.module.css';
import { time } from 'console';
import axios from 'axios';

type CommentBoxProps = {
  teamId: number;
}

type Reply = {
  teamId: number;
  nickName: string;
  commentId: number;
  content: string;
  createTime: string;
  replies: Reply[];
}

type Comment = {
  teamId: number;
  nickName: string;
  commentId: number;
  content: string;
  createTime: string;
  replies: Reply[];
}

function CommentBox(props: CommentBoxProps): JSX.Element {

  const teamId = 1;
  const currentMemberId = 1;
  
  const [comment, setComment] = useState<Comment[]>([]);
  const [commentUpdate, setCommentUpdate] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<string>('');

  const handleCommentInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(event.target.value);
  }

  const handleAddComment = () => {
    console.log(commentInput);
    const newComment = {      
      teamId: teamId,
      memberId: currentMemberId,
      content: commentInput  
    }
    axios.post(`http://13.124.112.157/api/team/${teamId}/comment`, newComment );
    setCommentUpdate(true);
  }

  useEffect(() => {
    axios.get(`http://13.124.112.157/api/team/${teamId}/comments`)
    .then((res) => {
      setComment(res.data.dataList);
    })
    .catch(console.error);
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
            (comment || []) .map(
              cmnt => {
                return (
                  <li className={styles.commentContainer} key={cmnt.commentId}>
                    <div className={styles.comment}>
                      <span className={styles.nickName}>{cmnt.nickName}</span>                      
                      <span className={styles.commentText}>{cmnt.content}</span>
                    </div>
                    <ul>
                      {(cmnt.replies || []).map((reply) =>
                        {return (
                          <li className={styles.reply} key={reply.commentId}>                          
                            <span className={styles.nickName}>{reply.nickName}</span>
                            <span className={styles.replyText}>{reply.content}</span>
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