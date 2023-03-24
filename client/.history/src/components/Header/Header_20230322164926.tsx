import React from 'react';

type GreetingsProps = {
  name: string;
};

const Greetings = ({name}: GreetingsProps) => (
  <div>Hello, {name}</div>
);

export default Greetings;