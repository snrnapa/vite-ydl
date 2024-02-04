import useSWR from 'swr';
import { useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';

const FileList = () => {
  // const [files, setFiles] = useState([]);

  // レンタルサーバーにデプロイする場合
  const api_host = 'http://127.0.0.1:8000/ydl-back';
  // vercelにデプロイだと環境変数が読めない
  // const api_host = 'https://www.napalog.com/ydl-back';
  const [reloadCount, setReloadCount] = useState(0);

  //ファイルを削除する
  const deleteFile = (e) => {
    const targetFileName = e.target.value;
    const apiEndpoint = api_host + '/delete_file/' + targetFileName;

    fetch(apiEndpoint);
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
    setReloadCount(reloadCount + 1);
  };
  const selfRefresh = () => {
    setReloadCount(reloadCount + 1);
  };

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(api_host + '/file_info', fetcher);

  const testconsole = () => {
    console.log(api_host + '/file_info');
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <p>loading...</p>
      ) : error ? (
        <p>failed to load</p>
      ) : (
        <div>
          <p className="text-3xl">YDL Application</p>
          <IconButton onClick={selfRefresh}>
            <RefreshIcon fontSize="large" />
          </IconButton>

          <Card className="p-4 bg-slate-400 space-y-3">
            <p className="text-3xl">File List</p>

            {data.map((file) => {
              return (
                <Card key={file.no} className="flex flex-col justify-center ">
                  <p className="text-xl">{file.title}</p>
                  <div>
                    <a href={api_host + '/get_file/' + file.title}>download</a>

                    <Button value={file.title} onClick={deleteFile}>
                      delete
                    </Button>
                  </div>
                </Card>
              );
            })}
          </Card>
        </div>
      )}

      <button onClick={testconsole}>テストするがな</button>
    </div>
  );
};

export default FileList;
