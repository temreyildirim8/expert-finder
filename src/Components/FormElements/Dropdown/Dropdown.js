import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Dropdown.scss";

const Dropdown = ({ options, changeEvent, placeholder, name, ...otherProps }) => {
  const [option, setOption] = useState('');
  const { register } = useForm();

  const handleChange = (event) => {
    const name = event.target.value;
    setOption(name);
    changeEvent(name)
  };

  return (
    <section>
      <select
        value={option.serviceId}
        onChange={handleChange}
        name={name || 'dropdown'}
        className="dropdown"
        placeholder={placeholder || ''}
        ref={register({ required: true })}      
      >
        <option value="">{placeholder || 'Seçiniz'}</option>
        {
          options ? options.map((option, index) => (
            <option value={option.serviceId} key={index}>{option.name}</option>
          ))
            : null}
      </select>
    </section>
  );
};

export default Dropdown;
