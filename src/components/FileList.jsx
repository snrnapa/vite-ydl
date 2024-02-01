import { useEffect } from 'react';

const FileList = () => {
  useEffect(() => {
    fetch('http://127.0.0.1:8000/file_info')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // const list = data.message;
        // setBreeds(Object.keys(list));
      });
  }, []);

  return <div>FileList</div>;
};

export default FileList;
