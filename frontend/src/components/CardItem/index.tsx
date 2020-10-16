import React from 'react';

import './styles.css';
import api from '../../services/api';
import warningIcon from '../../assets/images/icons/warning.svg';
import {FiEdit} from 'react-icons/fi'


export interface ISortition {
  id: string;
  name: string;
  email: string;
  name_sortition: string;
}

interface SortitionItemProps {
  sortition: any;
}

const CardItem: React.FC<SortitionItemProps> = ({ sortition }) => {
  return (
    <article className="teacher-item">
      {console.log(sortition[0].name_sortition)}
      <header>
        <div>
          <strong>Nome do Sorteio: {sortition[0].name_sortition}</strong>
        </div>
      </header>
      {sortition.map((e: ISortition) => (
        <>
          <div className="content">
            <p>
              nome:
              <strong> {e.name} </strong>
            </p>
            <p>
              email:
              <strong>{e.email} </strong>
            </p>
          </div>
        </>
      ))}
      <footer>
        <button type="button">Fazer Sorteio</button>
        <button type="button" className="edit"> Editar</button>
        <button type="button" className="delete">Excluir</button>
      
      </footer>
      <span>
        <img src={warningIcon} alt="Aviso importante" />
        Após fazer o sorteio, é enviado um email para todos os participantes com o nome do amigo secreto <br />
        
      </span>
    </article>
  );
};

export default CardItem;
