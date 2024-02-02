import { useRef } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

const Downloader = () => {
  const urlRef = useRef();

  const downloadUrl = () => {
    const targetId = urlRef.current.value.slice(-11);
    console.log(targetId);

    const apiEndpoint = 'http://127.0.0.1:8000/yt_donwload/' + targetId;
    console.log(apiEndpoint);

    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div>
      <Card className="p-4 space-y-3">
        <p className="text-3xl">Target List</p>
        <input className="w-96 bg-green-300" type="text" ref={urlRef}></input>
        <Button onClick={downloadUrl}>DownLoad</Button>
      </Card>
    </div>
  );
};

export default Downloader;
