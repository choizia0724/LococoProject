import './App.css';
import Main from './page/main';
import Insert from './page/insert';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './component/header';
import PackagesCost from './page/packagesCost';
import StuffCost from './page/stuffCost';
import Error401 from './page/401';

function App() {
  const [charName, setCharName] = useState('');
  const [isRealChar, setIsRealChar] = useState(false);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header name={charName} isRealChar={isRealChar} />
      <Routes>
        <Route path='/' element={<Insert />}></Route>
        <Route
          path='/char/:char'
          element={<Main charName={charName} setCharName={setCharName} />}
        ></Route>
        <Route
          path='/cost/packages'
          element={
            localStorage.getItem('apiKey') ? <PackagesCost /> : <Error401 />
          }
        />
        <Route path='/cost/stuff' element={<StuffCost />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
