/* eslint-disable react/prop-types */
import React from 'react';
import './DataTable.css';

const DataTable = ({selectedItems, data}) => {
  return (
    <React.Fragment>
      <div style={{margin: '4px 0', color: '#2e2e2e', textAlign: 'left', fontWeight: '600'}}>Asset List</div>
      <table>
        <thead>
          <tr>
            <th>대분류</th>
            <th>중분류</th>
            <th>소분류</th>
            <th>규칙 설명</th>
          </tr>
        </thead>
        {!selectedItems.length ? (
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.category0}</td>
                <td>{item.category1}</td>
                <td>{item.category2 || '-'}</td>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {selectedItems.map((item, index) => (
              <tr key={index}>
                <td>{item.category0}</td>
                <td>{item.category1}</td>
                <td>{item.category2 || '-'}</td>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </React.Fragment>
  );
};

export default DataTable;
