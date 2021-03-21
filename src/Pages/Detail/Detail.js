import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import "./Detail.scss";

import { twoSixTwoQuestions } from '../../Store/262-questions';
import { threeNineNineQuestions } from '../../Store/399-questions';
import { services } from '../../Store/services';
import back from '../../Assets/Images/back.png';
import close from '../../Assets/Images/close.png';

import Five from '../../Components/Questions/Five/Five';
import Eight from '../../Components/Questions/Eight/Eight';

const Detail = () => {
  const location = useLocation();
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentService, setCurrentService] = useState({});
  const [answers, setAnswers] = useState([]);
  const [currentAnswerValue, setCurrentAnswerValue] = useState(undefined);
  const [warning, setWarning] = useState('');
  // const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    location?.state?.selectedService === 262 ? setQuestions(twoSixTwoQuestions) : setQuestions(threeNineNineQuestions)
    const relatedService = location?.state?.selectedService && services.find((service) => Number(service.serviceId) === Number(location?.state?.selectedService))
    setCurrentService(relatedService);
  }, [location?.state?.selectedService]);

  useEffect(() => {
    questions.sort((a, b) => { // It mutates the root 'questions' in state but it is not important in our case
      if (a.pageNumber === b.pageNumber) {
        return a.order - b.order
      } 
      return a.pageNumber - b.pageNumber
    })
  }, [questions]);

  const handleContinue = () => {
    const currentQuestion = questions.find((question) => question.pageNumber === currentPage);
    const answersCopy = [...answers]
    const currentAnswer = answersCopy.find((answer) => answer.id === currentQuestion.id);
    if (!!currentAnswer && !!currentAnswerValue) {
      currentAnswer.value = currentAnswerValue
      increasePage(answersCopy)
    } else if (!currentAnswer && !!currentAnswerValue) {
      answersCopy.push({
        id: currentQuestion.id,
        value: currentAnswerValue
      })
      increasePage(answersCopy)

    } else if (!currentAnswerValue && !!currentQuestion?.required) {
      setWarning('Bu alan zorunludur')
    }
  }

  const increasePage = (answersCopy) => {
    setAnswers(answersCopy);
    if (currentPage !== questions[questions.length - 1]?.pageNumber) {
      setCurrentPage(currentPage + 1);
      setCurrentAnswerValue('')
    } else {
      setTimeout(() => { history.push('/'); }, 1000); // IT NEEDS TO BE SUCCESS PAGE
      setCurrentAnswerValue('')
    }
  }

  const handleBack = () => {
    setCurrentPage(currentPage - 1);
  }

  const handleClose = () => {
    history.push('/')
  }

  const getPriceLabel = (price)  => {
    return price && `${price.min} - ${price.max}`
  }

  const getPriceCurrency = (price) => {
    return price && ` ${price.currency}`
  }

  const getCurrentQuestions = () => {
    return questions.filter((question) => 
      question.pageNumber === currentPage
    )
  }

  const getAnswers = () => {
    const currentQuestion = questions.find((question) => question.pageNumber === currentPage);

    if (currentQuestion && currentQuestion?.typeId === Number(5)) {
      return ( 
        <Five values={currentQuestion.values} changeEvent={handleAnswer}/>
      )
    } else if (currentQuestion && currentQuestion?.typeId === Number(8)) {
      return( 
        <Eight placeholder={currentQuestion.placeHolder} changeEvent={handleAnswer}/>
      )
    } else if (currentQuestion && currentQuestion?.typeId === Number(13)) {
      return( 
        <div className='four-wrapper'>
          {/* + and - images here and current value as text in center,  
          first element of the values will be set as default value,
          values will be array,
          if + button clicked increase selected index of array and vice versa */}
        </div>
      )
    } else {
      return null
    }
  }

  const handleAnswer = (value) => {
    setCurrentAnswerValue(value)
  }

  return (
    <section className='wrapper-detail'> {/* We need to implement scoped scss to not change the wrapper as wrapper-detail  */}
      <div className='top'>
        {currentPage !== 0 ? <img className='img-one' alt='' src={back} onClick={handleBack}/> : <span></span>}
        <span className='label'> {currentService?.name}</span> 
        <img className='img-two' alt='' src={close} onClick={handleClose}/>
      </div>
      <div className='progress'>
        <ProgressBar completed={30 + (currentPage / questions.length ) * 100} isLabelVisible={false} height='3px' bgcolor='#2cb34f'/>
      </div>
      <div className='prices'>
        <span className='left'> Ortalama fiyat aralığı:</span> {/* It needs to be localized in a file like constants.js */}
        <div className='right'> 
        <span className='number'>
          {currentService ? getPriceLabel(currentService.price) : null} 
        </span>
        <span className='currency'>
          {currentService ? getPriceCurrency(currentService.price) : null} 
        </span>
        </div>
      </div>
      <div className='gray-border'> </div>
      { currentService?.discountRateText ? <div className='discount'>
        <span> {currentService?.discountRateText} </span>
        {/* Handle '%17' green color issue via regexp */}
      </div> 
      : null }
      <div className='below-wrapper'>
        {getCurrentQuestions() ? getCurrentQuestions().map((question) => (
          <div className='question-wrapper' key={question.id}>
            <div className='text'>
              <span>{question.label}</span>
            </div>
            <div className='answers'>
              {getAnswers()}
            </div>
          </div>
        )) : null}
        <div className='warning'> {warning} </div>
        <div className='button-wrapper'>
          {/* questions?.[currentPage]?.label */}
          <button onClick={handleContinue}> {currentPage !== questions[questions.length - 1]?.pageNumber ? 'DEVAM' : 'TALEP GÖNDER'}  </button> {/* It needs to be localized in a file like constants.js */}
        </div>
      </div>
    </section>
  );
};

export default Detail;
