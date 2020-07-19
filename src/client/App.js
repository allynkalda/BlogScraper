import React, { useEffect, useState } from 'react';
import './app.css';

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('/api/getText')
      .then(res => res.json())
      .then(info => setData(info));
  }, []);

  return (
    <div>
      {data.title ? <h1>{`Hello ${data.title}`}</h1> : <h1>Loading.. please wait!</h1>}
      {data.body && <div dangerouslySetInnerHTML={{ __html: data.body }} />}
    </div>
  );
};

export default App;
