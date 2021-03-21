import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Dropdown from "../../Components/FormElements/Dropdown/Dropdown";
import { services } from '../../Store/services';
import "./Entry.scss";

const Entry = () => {
  const [selectedService, setSelectedService] = useState();
  const [changed, setChanged] = React.useState(false);
  const history = useHistory();
  const { handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleChange = (value) => {
    setChanged(true)
    setSelectedService(value)
    history.push('/detail', { selectedService: value })
  };

  return (
    <section className='wrapper'>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <Dropdown options={services} placeholder='Servis seçiniz.' name='services' changeEvent={handleChange}/>
        {changed && !selectedService && <span>Bu alan zorunludur</span>}
      </form>
    </section>
  );
};

export default Entry;
