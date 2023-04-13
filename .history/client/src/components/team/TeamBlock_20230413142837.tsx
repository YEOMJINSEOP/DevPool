import React from 'react';

type TeamProps = {
  name: string;
  category: string;
  currentCount: number;
  recruitCount: number;
  recruitDomain: string;
  recruitStack: string[];
};

function TeamBlock(props: TeamProps): JSX.Element{
  return (
    <div>
      {props.name}
      {props.category}
      {props.currentCount}
      {props.recruitCount}
      {props.recruitDomain}
      {props.recruitStack}
    </div>
  );
}

export default TeamBlock;