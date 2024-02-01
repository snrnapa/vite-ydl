import Divider from '@mui/material/Divider';
import { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

const FileList = () => {
  const [files, setFiles] = useState([]);

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

  const downloadFile = (e) => {
    console.log(e.target.value);
  };

  const deleteFile = (e) => {
    console.log(e.target.value);
  };

  const urlRef = useRef();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/file_info')
      .then((response) => response.json())
      .then((data) => {
        setFiles(data);
      });
  }, []);

  return (
    <div className="space-y-6">
      <p className="text-3xl">YDL Application</p>

      <Card className="p-4 bg-slate-400 space-y-3">
        <p className="text-3xl">File List</p>

        {files.map((file) => {
          return (
            <Card className="flex flex-col justify-center ">
              <p className="text-xl">{file.title}</p>
              <div>
                <Button value={file.title} onClick={downloadFile}>
                  download
                </Button>
                <Button value={file.title} onClick={deleteFile}>
                  delete
                </Button>
              </div>
            </Card>
          );
        })}
      </Card>

      <Card className="p-4 space-y-3">
        <p className="text-3xl">Target List</p>
        <input className="w-96 bg-green-300" type="text" ref={urlRef}></input>
        <Button onClick={downloadUrl}>DownLoad</Button>
      </Card>
    </div>
  );
};

export default FileList;
