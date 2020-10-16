import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import warningIcon from '../../assets/images/icons/warning.svg';

import CardItem from '../../components/CardItem';
import api from '../../services/api';
import './styles.css';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export interface ISortition {
  _id: string;
  name: string;
  email: string;
  name_sortition: string;
}

function DrawList() {
  const [sortition, setSortition] = useState<ISortition[][]>([]);
  const history = useHistory();

  const handleApiRequest = useCallback(async () => {
    try {
      const { data } = await api.get('/sortition');
      const names = data.map((e: ISortition) => e.name_sortition);
      const nameSortition = names.filter(
        (name: string, i: number) => names.indexOf(name) === i,
      );

      let arr: ISortition[][] = [];
      nameSortition.forEach((e: string) => {
        const res = data.filter((val: ISortition, i: number) => {
          return val.name_sortition === e;
        });
        arr.push(res);
      });
      setSortition(arr);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, []);

  const handleDeleteItem = useCallback(async name => {
    await api.delete(`sortition/user/${name}`);
    handleApiRequest();
  }, []);
  useEffect(() => {
    handleApiRequest();
  }, [handleApiRequest]);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os sorteios cadastrados de Amigo Secreto." />

      <main>
        {sortition
          ? sortition.map((item, i) => (
              <article className="teacher-item">
                <header>
                  <div>
                    <strong>Nome do Sorteio: {item[0].name_sortition}</strong>
                  </div>
                </header>

                {item.map(e => (
                  <div key={e._id} className="content">
                    <p>
                      nome:
                      <strong>{e.name} </strong>
                    </p>
                    <p>
                      email:
                      <strong> {e.email}</strong>
                    </p>
                    <div>
                      <button type="button">
                        <Link to={`/new-draw/${e._id}`}>
                          <FiEdit style={{ height: 30 }} />
                        </Link>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(e._id)}
                      >
                        <FiTrash2 style={{ height: 30 }} />
                      </button>
                    </div>
                  </div>
                ))}

                <footer>
                  <button type="button">Fazer Sorteio</button>
                </footer>
                <span>
                  <img src={warningIcon} alt="Aviso importante" />
                  Após fazer o sorteio, é enviado um email para todos os
                  participantes com o nome do amigo secreto <br />
                </span>
              </article>
            ))
          : 'nenhum encontrado'}
      </main>
    </div>
  );
}

export default DrawList;
