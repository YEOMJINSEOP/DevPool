import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../recoil/user';

type Team = {
  name: string;
  category: string;
  currentCount: number;
  recruitCount: number;
  recruitDomain: string;
  recruitStack: string[];
};

function TeamInfo(){

  return (
    <>
    </>
  )
}

export default TeamInfo;