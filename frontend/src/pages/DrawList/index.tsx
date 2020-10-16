import React, { useState, FormEvent, useEffect, useCallback } from 'react';

import PageHeader from '../../components/PageHeader';
import CardItem, { ISortition } from '../../components/CardItem';

import api from '../../services/api';

import './styles.css';

function DrawList() {
  const [sortition, setSortition] = useState<ISortition[]>([]);

  const handleApiRequest = useCallback(async () => {
    try {
      const { data } = await api.get('/sortition');
      const names = data.map((e: ISortition) => e.name_sortition);
      const nameSortition = names.filter(
        (name: string, i: number) => names.indexOf(name) === i,
      );

      let arr: ISortition[] = [];
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

  useEffect(() => {
    handleApiRequest();
  }, [handleApiRequest]);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os sorteios cadastrados de Amigo Secreto." />

      <main>
        {sortition ? (
          sortition.map(item => <CardItem sortition={item} />)
        ) : (
          <h3>Nenhum sorteio encontrado!</h3>
        )}
      </main>
    </div>
  );
}

export default DrawList;
