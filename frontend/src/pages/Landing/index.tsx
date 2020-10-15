import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import studyIcon from '../../assets/images/icons/study.svg';

import { FiPlusCircle, FiAlignJustify } from 'react-icons/fi';
import './styles.css';

function Landing() {
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <h2>Faça seu sorteio de amigo secreto aqui!</h2>
        </div>

        <div className="buttons-container">
          <Link to="/draw-list" className="study">
              <FiAlignJustify />
            Lista de Sorteios
          </Link>

          <Link to="/new-draw" className="give-classes">
              <FiPlusCircle />
            Cadastrar Sorteio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
