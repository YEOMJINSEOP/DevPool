import { useEffect, useState } from 'react';
import styles from './CommentBox.module.css';

type CommentBoxProps = {
  teamId: number;
}

type Reply = {
  id: number;
  text: string;
}

type Comment = {
  teamId: number;
  id: number;
  text: string;
  replies: Reply[];
}

function CommentBox(props: CommentBoxProps): JSX.Element {
  const [comment, setComment] = useState<Comment[]>([{
    "teamId": 1,
    "id": 1,
    "text": "This is a comment.",
    "replies": [
      {
        "id": 2,
        "text": "This is a reply to the first comment."
      },
      {
        "id": 3,
        "text": "This is another reply to the first comment."
      }
    ]
  },
  {
    "teamId": 1,
    "id": 2,
    "text": "This is a comment.2",
    "replies": [
      {
        "id": 2,
        "text": "This is a reply to the first comment."
      },
      {
        "id": 3,
        "text": "This is another reply to the first comment."
      }
    ]
  },
])

  useEffect(() => {
    // ✅ teamId를 매개변수로 넘겨주고, 해당되는 comment를 get 하는 API 필요 => setComment
  }, [])
  return (
    <div className={styles.commentBoxContainer}>
      <div className={styles.commentBox}>
        <input className={styles.inputComment} type="text" />
        <ul className={styles.commentList}>
          {
            comment.map(
              cmnt => {
                return (
                  <li className={styles.comment} key={cmnt.id}>
                    <div>{cmnt.text}</div>
                    <ul>
                      {cmnt.replies.map((reply) =>
                        {return (
                          <li className={styles.reply} key={reply.id}>
                            {reply.text}
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