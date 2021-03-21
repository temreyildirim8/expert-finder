import React, { useState } from "react";
import "./Four.scss";

import plus from '../../Assets/Images/plus.png';
import minus from '../../Assets/Images/minus.png';

const Four = ({ questionOne, questionTwo, changeEvent, ...otherProps }) => {
  const [option, setOption] = useState([
    {
      id: questionOne.id,
      value: '',
    },
    {
      id: questionTwo.id,
      value: '',
    }
  ]);

  const handleChange = (value) => {
    const name = value;
    setOption(Number(name));
    changeEvent(name)
  };

  return (
    <section className='type-four-wrapper'>
      {/* question label needs to be moved here for this kind of multiple questions or directly whole questions' components */}
      <div className='type-four'>
        <div className='question-one'>
          <img className='minus' alt='' src={minus}/>
          <span> {option[0].value}</span>
          <img className='plus' alt='' src={plus}/>
        </div>
        <div className='question-two'>
          <img className='minus' alt='' src={minus}/>
          <span> {option[1].value}</span>
          <img className='plus' alt='' src={plus}/>
        </div>
      </div>
    </section>
  );
};

export default Four;
