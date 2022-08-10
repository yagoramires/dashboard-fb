import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; // mapeia a autenticacao do usuario
//hooks
import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';

// Components
import Home from './pages/Home/Home';
// Pages
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
// import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';
import { AuthProvider } from './context/AuthContext';
import RegisterClient from './pages/RegisterClient/RegisterClient';
import RegisterIndustry from './pages/RegisterIndustry/RegisterIndustry';
import RegisterOrder from './pages/RegisterOrder/RegisterOrder';
import RegisterProduct from './pages/RegisterProduct/RegisterProduct';

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuth();

  const loadingUser = user === undefined; //se o usuario for undefined, significa que estará carregando algo

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // é passado o valor de autenticacao (auth), e uma funcao que retorna um user diferente de undefined
      setUser(user);
    });
  }, [auth]); // quando atualizar o auth executa a funcao

  if (loadingUser) {
    return (
      <section>
        <p> Carregando ...</p>
      </section>
    );
  } // caso o user seja undefined irá retornar o paragrafo carregando

  return (
    <div className='App'>
      <AuthProvider value={{ user }}>
        <Header />
        <Routes>
          {/* Home Page */}
          <Route
            path='/'
            element={!user ? <Navigate to='/login' /> : <Home />}
          />
          {/* Login Page */}
          <Route
            path='/login'
            element={user ? <Navigate to='/' /> : <Login />}
          />
          {/* Register Pages */}
          {/* <Route
              path='/register/user'
              element={user ? <Navigate to='/' /> : <Register />}
            /> */}
          <Route
            path='/register/client'
            element={!user ? <Navigate to='/login' /> : <RegisterClient />}
          />
          <Route
            path='/register/industry'
            element={!user ? <Navigate to='/login' /> : <RegisterIndustry />}
          />
          <Route
            path='/register/order'
            element={!user ? <Navigate to='/login' /> : <RegisterOrder />}
          />
          <Route
            path='/register/product'
            element={!user ? <Navigate to='/login' /> : <RegisterProduct />}
          />
          {/* <Route
            path='/profile'
            element={user ? <Navigate to='/' /> : <Profile />}
          /> */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
