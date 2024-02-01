import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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

  return (
    <div className="space-y-6">
      <p className="text-3xl">YDL Application</p>

      <Card className="p-4 bg-slate-400">
        <p className="text-3xl">File List</p>
      </Card>

      <Card className="p-4">
        <p className="text-3xl">Target List</p>

        <CardContent>ここにはコンテントが入ります</CardContent>
      </Card>
    </div>
  );
};

export default FileList;
