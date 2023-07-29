import React, {useState } from 'react'
import { HistoryRouterProps } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/Navbar'
import QuestionLeftbar from '../components/QuestionLeftbar';

import "../styles/Questions.css"

function Questions() {
  
  return (
    <div>
        <Navbar/>
        <div id='questionsHeader'>
            <QuestionLeftbar />
            <div id="parent">

            </div>
        </div>
    </div>
  )
}

export default Questions
