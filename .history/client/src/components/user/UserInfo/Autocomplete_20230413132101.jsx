import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const deselectedOptions = [
    'Javascript',
    'Java',
    'React',
    'HTML',
    'CSS',
    'Vue',
    'Node.js',
    'DB',
    'Deep Learning(AI)',
    'Computer Vision(AI)',
    'Spring'
  ];

export default function Autocomplete({ stackInput, handleInputChange, handleAddStack }) {
    const [hasText, setHasText] = useState(false);
    // input에 입력값이 존재하는지 확인하는 용도
  
    const [options, setOptions] = useState(deselectedOptions);
    // 자동완성으로 보여줄 값들을 저장하는 용도
  
    useEffect(() => {
      if (stackInput === '') {
        setHasText(false);
        setOptions([]);
      } else {
        setHasText(true);
        setOptions(deselectedOptions.filter((option) => {
          return option.toLowerCase().includes(stackInput.toLocaleLowerCase())
        }))
      }
    }, [stackInput]);
    // input을 입력할 때마다, input을 포함(includes)한 요소들만 모아 options 배열 업데이트
  
    const handleDropDownClick = (clickedOption) => {
      handleInputChange(clickedOption);
    };
    // 보여지는 자동완성 값 중 하나를 클릭하면 해당 값이 input에 할당
  
    const handleDeleteButtonClick = () => {
      handleInputChange('');
    };
    // 삭제 버튼을 누르면, stackInput 초기화
  
    return (
      <div className='autocomplete_wrapper'>
        <div>
          <input onChange={(event)=>handleInputChange(event.target.value)} value={stackInput}></input>
          <button className='delete_button' onClick={handleDeleteButtonClick}>지우기</button>
        </div>
        {hasText && <DropDown options={options} handleDropDownClick={handleDropDownClick} handleAddStack={handleAddStack} />}
        {/* // 입력된 텍스트가 있을 때만 드롭다운이 보여지도록 조건 설정
        // 하지 않을 시, 아무 것도 입력하지 않은 상태에서도 드롭다운이 보여짐 */}
      </div>
    );
};

export const DropDown = ({ options, handleDropDownClick, handleAddStack }) => {
    return (
      <ul>
        {options.map((option, index) => {
          return (
            <>
            <li key = {index}
            onClick = {()=>handleAddStack(option)}
            id="stack">
              {option}
            </li>
            </>
          )
        })}
      </ul>
    );
  };
