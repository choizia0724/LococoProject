import './App.css';
import Main from './page/main';
import Insert from './page/insert';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Insert />}></Route>
        <Route path='/:char' element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
