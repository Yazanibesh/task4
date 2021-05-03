import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';

// Services
import { Helper } from '../../services/Helper';

import './Task1.scss';

const Task1 = () => {
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
  });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const next = () => {
    const pag = {
      ...pagination,
      offset: pagination.offset + pagination.limit,
    }
    setPagination(pag);
  }

  const prev = () => {
    if (pagination.offset > 0) {
      const pag = {
        ...pagination,
        offset: pagination.offset - pagination.limit,
      }
      setPagination(pag);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const res = await axios({
        method: 'GET',
        url: `https://pokeapi.co/api/v2/ability/?limit=${pagination.limit}&offset=${pagination.offset}`,
      });
      console.log(res);
      setData([...res.data.results]);
      setTotal(res.data.count);
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.limit, pagination.offset]);

  useEffect(() => {
    setTotalPage(Helper.getNumberOfPages(total, pagination.limit));
  }, [total, pagination]);

  useEffect(() => {
    console.log('Total pages', totalPage);
  }, [totalPage]);

  return (
    <Fragment>
      <div className="task1-content">
        <h3>POKEAPI Ability</h3>

        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Link</th>
            </tr>
          </thead>

          <tbody>
            {data && data.length ? data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.url}</td>
              </tr>
            )) : null}
          </tbody>
        </table>

        <div className="pagination-btn">
          <Button type="primary" disabled={pagination.offset === 0 ? true : false} onClick={prev}>
            <i className="fas fa-chevron-left"></i>
          </Button>

          <Button type="primary" onClick={next}>
            <i className="fas fa-chevron-right"></i>
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Task1;
