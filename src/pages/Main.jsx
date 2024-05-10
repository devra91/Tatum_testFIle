import React, {useState} from 'react';
import Table from './Table';

const Main = () => {
  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState([]);

  // 입력된 CSV 파일 변환
  const processCSV = (str, delim = ',') => {
    const headers = str.slice(0, str.indexOf('\n')).split(delim);
    const cleanedHeaders = headers.map((header) => header.trim().replace('\r', ''));
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');

    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const eachObject = cleanedHeaders.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });
    setCsvArray(newArray);
  };

  // CSV파일 제출용
  const submitFile = () => {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      processCSV(text);
    };

    reader.readAsText(file);
  };

  return (
    <React.Fragment>
      {csvArray.length ? (
        <Table csvArray={csvArray} />
      ) : (
        <form id="csv-form">
          <input
            type="file"
            accept=".csv"
            id="csvFile"
            onChange={(e) => {
              setCsvFile(e.target.files[0]);
            }}></input>
          <br />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (csvFile) submitFile();
            }}>
            Submit
          </button>
          <br />
        </form>
      )}
    </React.Fragment>
  );
};

export default Main;
