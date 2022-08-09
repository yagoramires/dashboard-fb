import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import Home from './pages/Home/Home';
// Pages
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';

function App() {
  const user = false;

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={!user ? <Navigate to='/login' /> : <Home />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route
          path='/register'
          element={user ? <Navigate to='/' /> : <Register />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
