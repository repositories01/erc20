import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import warningIcon from '../../assets/images/icons/warning.svg';
import { FiMinusCircle } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameSortition, setNameSortition] = useState('');

  const [participant, setSParticipant] = useState([{ name: '', email: '' }]);

  function addNewParticipant() {
    setSParticipant([...participant, { name: '', email: '' }]);
  }
  function removeParticipant(index: number) {
    const result = participant.filter((e, i) => i != index);
    setSParticipant(result);
  }

  function setParticipantValue(position: number, field: string, value: string) {
    const updatedParticipant = participant.map((item, index) => {
      if (index === position) {
        return { ...item, [field]: value };
      }

      return item;
      console.log(updatedParticipant);
    });

    setSParticipant(updatedParticipant);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    if (participant.length === 1 || !nameSortition) {
      alert('preencha todos os campos e escolha mais de um participante!');
    } else {
      const res = Object.assign({
        name_sortition: nameSortition,
        participants: participant,
      });

      

      api
        .post('/sortition', res)
        .then(() => {
          alert('cadastro realizado com sucesso');
          history.push('/draw-list');
        })
        .catch(() => {
          alert('Erro no cadastro!');
        });
    }
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer fazer um novo sorteio."
        description="O primeiro passo é preencher os dados dos participantes"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>
              Dados dos participantes
              <button type="button" onClick={addNewParticipant}>
                + Novo Participante
              </button>
            </legend>
            <Input
              name="name_sortition"
              label="Nome do Sorteio"
              value={nameSortition}
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
