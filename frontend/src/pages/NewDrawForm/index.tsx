import React, { useState, FormEvent, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import { ISortition } from '../DrawList';
import warningIcon from '../../assets/images/icons/warning.svg';
import { FiMinusCircle } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export interface IUserPublicProfileRouteParams {
  id: string;
}

function TeacherForm() {
  const history = useHistory();
  const [nameSortition, setNameSortition] = useState('');
  const { id } = useParams<IUserPublicProfileRouteParams>();

  const [participant, setParticipant] = useState([{ name: '', email: '' }]);

  function addNewParticipant() {
    setParticipant([...participant, { name: '', email: '' }]);
  }
  function removeParticipant(index: number) {
    const result = participant.filter((e, i) => i != index);
    setParticipant(result);
  }

  function setParticipantValue(position: number, field: string, value: string) {
    const updatedParticipant = participant.map((item, index) => {
      if (index === position) {
        return { ...item, [field]: value };
      }

      return item;
    });

    setParticipant(updatedParticipant);
  }

  async function handleCreateDraw(e: FormEvent) {
    e.preventDefault();

    try {
      if (id) {
        const res = await api.put(`sortition/user/${id}`, {
          name: participant[0].name,
          email: participant[0].email,
        });
      } else {
        await api.post('sortition', {
          name_sortition: nameSortition.replace(' ', ''),
          participants: participant,
        });
      }
      alert('cadastro realizado com sucesso');
      history.push('/draw-list');
    } catch (err) {
      console.log(err);
      alert('Erro no cadastro!');
    }
  }

  const filterApi = async () => {
    const response = await api.get('/sortition');
    const user = response.data.filter((obj: ISortition) => obj._id === id);
    console.log(user[0].name_sortition);
    setParticipant(user);
    setNameSortition(user[0].name_sortition);
  };

  useEffect(() => {
    if (id) {
      filterApi();
    }
  }, []);
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer fazer um novo sorteio."
        description="O primeiro passo é preencher os dados dos participantes"
      />

      <main>
        <form onSubmit={handleCreateDraw}>
          <fieldset>
            <legend>
              Dados dos participantes
              <button
                type="button"
                disabled={id ? true : false}
                onClick={addNewParticipant}
              >
                + Novo Participante
              </button>
            </legend>
            <Input
              name="name_sortition"
              label="Nome do Sorteio"
              defaultValue={nameSortition}
              disabled={id ? true : false}
              onChange={e => {
                setNameSortition(e.target.value);
              }}
            />

            {participant.map((user, index) => {
              return (
                <div className="schedule-item">
                  <Input
                    name="name"
                    label="Nome"
                    type="text"
                    defaultValue={user.name}
                    onChange={e => {
                      setParticipantValue(index, 'name', e.target.value);
                    }}
                  />
                  <Input
                    name="email"
                    label="Email"
                    type="text"
                    defaultValue={user.email}
                    onChange={e =>
                      setParticipantValue(index, 'email', e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeParticipant(index)}
                    className="button-delete"
                  >
                    <FiMinusCircle />
                  </button>
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>

            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
