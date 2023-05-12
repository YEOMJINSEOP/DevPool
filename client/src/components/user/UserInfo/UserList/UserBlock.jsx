import React from 'react'
import StackField from '../StackField'

export default function UserBlock({ user }) {
  return (
    <div style={{border: '1px solid black'}}>
        <div style={{display: 'flex'}}>
            <span style={{marginRight: '20px', fontSize: '20px', fontWeight: 600}}>이미지</span>
            <h3>
                {user.name}
            </h3>
            <button>쪽지 보내기</button>
        </div>
        <div>
            <StackField selectedStack={user.stack} />
        </div>
    </div>
  )
}
