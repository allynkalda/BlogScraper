import React, { useEffect, useState } from 'react';
import './app.css';

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(info => setData(info));
  }, []);
  console.log(data);
  return (
    <div>
      {data.title ? <h1>{`Hello ${data.title}`}</h1> : <h1>Loading.. please wait!</h1>}
      {data ? data.body : ''}
    </div>
  );
};

export default App;
