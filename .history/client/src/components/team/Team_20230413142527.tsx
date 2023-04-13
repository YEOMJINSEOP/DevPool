import React from 'react';

type Team = {
  name: string;
  category: string;
  currentCount: number;
  recruitCount: number;
  recruitDomain: string;
  recruitStack: string[];
};

function Team(props: Team): JSX.Element{
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

export default Team;