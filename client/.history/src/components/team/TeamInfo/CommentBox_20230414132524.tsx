import { useEffect, useState } from 'react';

type CommentBoxProps = {
  teamId: number;
}

type Comment = {
  teamId: number;
  id: number;
  text: string;
  replies: Comment[];
}

function CommentBox(props: CommentBoxProps): JSX.Element {
  const [comment, setComment] = useState<Comment[]>([{
    teamId: 0,
    id: 0,
    text: '',
    replies: []
  }])

  useEffect(() => {
    // ✅ teamId를 매개변수로 넘겨주고, 해당되는 comment를 get 하는 API 필요 => setComment
  }, [])
  return (
    <div>
      comment
    </div>
  );
}

export default CommentBox;