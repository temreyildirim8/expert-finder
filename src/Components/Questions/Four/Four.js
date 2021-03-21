import React, { useState } from "react";
import "./Four.scss";

import plus from '../../../Assets/Images/plus.png';
import minus from '../../../Assets/Images/minus.png';

const Four = ({ questionOne, questionTwo, changeEvent, ...otherProps }) => {
  const [option, setOption] = useState([
    {
      id: questionOne.id,
      value: questionOne?.values?.[0]?.value,
    },
    {
      id: questionTwo.id,
      value: questionTwo?.values?.[0]?.value,
    }
  ]);

  const handleChange = (direction, question) => {
    const optionCopy = [...option];
    if (direction === 'minus' && question === 'one') {
      const item = questionOne?.values?.find((item) => option[0].value === item.value)
      const itemIndex = questionOne?.values?.indexOf(item);
      if (itemIndex !== 0) {
        optionCopy[0].value = questionOne?.values?.[itemIndex - 1]?.value
      }
    } else if (direction === 'plus' && question === 'one') {
      const item = questionOne?.values?.find((item) => option[0].value === item.value)
      const itemIndex = questionOne?.values?.indexOf(item);
      if (itemIndex !== questionOne?.values?.length) {
        optionCopy[0].value = questionOne?.values?.[itemIndex + 1]?.value
      }
    } else if (direction === 'minus' && question === 'two') {
      const item = questionTwo?.values?.find((item) => option[1].value === item.value)
      const itemIndex = questionTwo?.values?.indexOf(item);
      if (itemIndex !== 0) {
        optionCopy[1].value = questionTwo?.values?.[itemIndex - 1]?.value
      }
    } else if (direction === 'plus' && question === 'two') {
      const item = questionTwo?.values?.find((item) => option[1].value === item.value)
      const itemIndex = questionTwo?.values?.indexOf(item);
      if (itemIndex !== questionTwo?.values?.length) {
        optionCopy[1].value = questionTwo?.values?.[itemIndex + 1]?.value
      }
    } 
    setOption(optionCopy);
    changeEvent(option);
  };

  return (
    <section className='type-four-wrapper'>
      <div className='type-four'>
        <div className='text'>
          <span>{questionOne.label}</span>
        </div>
        <div className='question-one'>
          <img className='minus' alt='' src={minus} onClick={() => handleChange('minus', 'one')}/>
          <span> {option[0].value}</span>
          <img className='plus' alt='' src={plus} onClick={() => handleChange('plus', 'one')}/>
        </div>
        <div className='unit'> <span> {questionOne.unit}</span> </div>
        <div className='text'>
          <span>{questionTwo.label}</span>
        </div>
        <div className='question-two'>
          <img className='minus' alt='' src={minus} onClick={() => handleChange('minus', 'two')}/>
          <span> {option[1].value}</span>
          <img className='plus' alt='' src={plus} onClick={() => handleChange('plus', 'two')}/>
        </div>
        <div className='unit'> <span> {questionTwo.unit}</span> </div>
      </div>
    </section>  
  );
};

export default Four;
