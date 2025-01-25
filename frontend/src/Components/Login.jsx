import React from 'react';
import Login from '@react-login-page/page11';

const Demo = () => {
  const [data, setData] = React.useState({});
  const handle = (even) => {
    even.preventDefault();
    const formData = new FormData(even.target);
    const data = Object.fromEntries(formData);
    setData({ ...data });
  };
  return (
    <form onSubmit={handle}>
      <Login style={{ minHeight: 380 }} />
      <h3>Result:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </form>
  );
};

export default Demo;