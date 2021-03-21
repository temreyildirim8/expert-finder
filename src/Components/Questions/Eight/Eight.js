import React, { useState } from "react";
import "./Eight.scss";

const Eight = ({ placeholder, changeEvent, required, ...otherProps }) => {
  const [option, setOption] = useState('');

  const handleChange = (event) => {
    const name = event.target.value;
    setOption(name);
    changeEvent(name)
  };

  return (
    <section className='eight-wrapper'>
        <textarea value={option} onChange={handleChange} placeholder={placeholder} rows={8} cols={40}/>
    </section>
  );
};

export default Eight;
