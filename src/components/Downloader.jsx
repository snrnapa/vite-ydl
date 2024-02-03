import MovieIcon from '@mui/icons-material/Movie';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useRef, useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

const Downloader = () => {
  // レンタルサーバーにデプロイする場合
  // const api_host = import.meta.env.VITE_API_HOST;
  // vercelにデプロイだと環境変数が読めない
  const api_host = 'https://www.napalog.com/ydl-back';

  const urlRef = useRef();
  const [movieFlg, setMovieFlg] = useState(false);
  const [musicFlg, setMusicFlg] = useState(true);

  const downloadUrl = () => {
    // const targetId = urlRef.current.value.slice(-11);
    const targetId = urlRef.current.value;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: targetId }),
    };

    const apiEndpoint = api_host + '/yt_donwload/' + targetId;
    console.log(apiEndpoint);
    fetch(apiEndpoint, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleMovieFlg = () => {
    setMovieFlg(!movieFlg);
  };
  const handleMusicFlg = () => {
    setMusicFlg(!musicFlg);
  };

  return (
    <div>
      <Card className="p-4 space-y-3">
        <p className="text-3xl">Target List</p>
        <input className="w-96 bg-green-300" type="text" ref={urlRef}></input>
        <Button onClick={downloadUrl}>DownLoad</Button>
        <div className="flex-col flex space-y-2">
          <label className="space-x-3">
            <MovieIcon fontSize="large" />
            <input
              className="w-7 h-7"
              type="checkbox"
              checked={movieFlg}
              onChange={handleMovieFlg}
              disabled="disabled"
            />
          </label>
          <label className="space-x-3">
            <MusicNoteIcon fontSize="large" />
            <input
              className="w-7 h-7"
              type="checkbox"
              checked={musicFlg}
              onChange={handleMusicFlg}
            />
          </label>
        </div>
      </Card>
    </div>
  );
};

export default Downloader;
