import './App.css';
import Main from './page/main';
import Insert from './page/insert';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Cost from './page/cost';

function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Insert />}></Route>
        <Route path='/char/:char' element={<Main />}></Route>
        <Route path='/cost' element={<Cost />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
