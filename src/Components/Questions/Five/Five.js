import React, { useState } from "react";
import "./Five.scss";

const Five = ({ values, changeEvent, required, ...otherProps }) => {
  const [option, setOption] = useState('');

  const handleChange = (value) => {
    const name = value;
    setOption(Number(name));
    changeEvent(name)
  };

  const handlerRadioChange = (event) => {
    const name = event.target.value;
    setOption(Number(name));
    changeEvent(name)
  };

  return (
    <section className='type-five-wrapper'>
      {values ? values.map((value) => (
        <div key={value.id}>
          <div className='type-five' onClick={() => handleChange(value.id)}>
            <div className='image'><img alt='' src={value.valueImageUrl}/></div>
            <div className='bottom'>
              <input type="radio" value={value.id} name="gender" checked={option === value.id} onChange={handlerRadioChange}/> 
              <span> {value.value}</span>
            </div>
          </div>
          <span>{ required === true && option !== '' ? 'Seçiniz' : ''}</span>
        </div>
      )) : null}
    </section>
  );
};

export default Five;
