import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    fetch('http://127.0.0.1:8000/file_info')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // const list = data.message;
        // setBreeds(Object.keys(list));
      });
  }, []);
  return (
    <>
      <h1 className="bg-teal-400">Vite + React</h1>
    </>
  );
}

export default App;
