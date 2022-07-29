import './App.css'
import * as XLSX from "xlsx";
import { useState } from 'react';

function App() {

  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  return (
    <div className='container'>
      <header>
        <input className='file-input' type='file' onChange={(e) => {

          const file = e.target.files[0]

          readExcel(file)
        }} />
      </header>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>UAU</th>
              <th>CARGO</th>
            </tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.id}>
                <td>{d.Nombre}</td>
                <td>{d.UAU}</td>
                <td>{d.CARGO}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



    </div>
  )
}

export default App
