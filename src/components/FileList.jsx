import { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';

const FileList = () => {
  const [files, setFiles] = useState([]);

  const downloadFile = (e) => {
    const targetFileName = e.target.value;
    const apiEndpoint = 'http://127.0.0.1:8000/get_file/' + targetFileName;

    console.log(apiEndpoint);

    fetch(apiEndpoint);
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  };

  const deleteFile = (e) => {
    const targetFileName = e.target.value;
    const apiEndpoint = 'http://127.0.0.1:8000/delete_file/' + targetFileName;

    console.log(apiEndpoint);

    fetch(apiEndpoint);
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  };

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
      <RefreshIcon fontSize="large" />

      <Card className="p-4 bg-slate-400 space-y-3">
        <p className="text-3xl">File List</p>

        {files.map((file) => {
          return (
            <Card className="flex flex-col justify-center ">
              <p className="text-xl">{file.title}</p>
              <div>
                <a href={'http://127.0.0.1:8000/get_file/' + file.title}>
                  download
                </a>

                <Button value={file.title} onClick={deleteFile}>
                  delete
                </Button>
              </div>
            </Card>
          );
        })}
      </Card>
    </div>
  );
};

export default FileList;
