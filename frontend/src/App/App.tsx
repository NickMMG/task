/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from '../features/main/Main';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;
