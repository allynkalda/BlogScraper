import React, { useEffect, useState } from 'react';
import './app.css';
import GetText from './api';

const App = () => {
  const [data, setData] = useState({});
  const url = 'https://saudadeandotherstories.blogspot.com/2018/12/post-break-up-day-18.html';

  const getText = async () => {
    const res = await GetText(url);
    setData(res);
  };

  useEffect(() => {
    getText();
  }, []);

  return (
    <div>
      {data.title ? <h1>{`Hello ${data.title}`}</h1> : <h1>Loading.. please wait!</h1>}
      {data.body && <div dangerouslySetInnerHTML={{ __html: data.body }} />}
    </div>
  );
};

export default App;
