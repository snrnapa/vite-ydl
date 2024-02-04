import useSWR from 'swr';
import { useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';

const FileList = () => {
  const api_host = import.meta.env.VITE_API_HOST;
  const [reloadCount, setReloadCount] = useState(0);

  //ファイルを削除する
  const deleteFile = (e) => {
    const targetFileName = e.target.value;
    const apiEndpoint = api_host + '/delete_file/' + targetFileName;

    fetch(apiEndpoint);

    setReloadCount(reloadCount + 1);
  };
  const selfRefresh = () => {
    setReloadCount(reloadCount + 1);
  };

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(api_host + '/file_info', fetcher, {
    refreshInterval: 1000,
  });

  return (
    <div className="space-y-6 bg-gray-400 rounded ">
      {isLoading ? (
        <p>loading...</p>
      ) : error ? (
        <p>failed to load</p>
      ) : (
        <div className="p-4  space-y-3 rounded overflow-hidden shadow-lg">
          <p className="text-3xl font-mono">File List</p>
          <IconButton onClick={selfRefresh}>
            <RefreshIcon fontSize="large" />
          </IconButton>

          {data.map((file) => {
            return (
              <div
                key={file.no}
                className="flex flex-col justify-center rounded border  shadow-lg bg-cyan-100 "
              >
                <p className="text-xl">{file.title}</p>
                <div>
                  <a href={api_host + '/get_file/' + file.title}>download</a>

                  <Button value={file.title} onClick={deleteFile}>
                    delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileList;
