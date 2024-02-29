import './assets/css/styles.css';
import './assets/css/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { RouterProvider } from 'react-router-dom';
import ProjectRouter from './components/router/ProjectRouter';
import { useEffect, useState } from 'react';
import LoginRouter from './components/router/LoginRouter';
import axios from 'axios';
import LoadingPage from './components/modules/Views/Lodaing';


function App() {

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.token != undefined) {
      setAuth(true)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token
    }
  }, [])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous task, such as fetching data or performing calculations
    setTimeout(() => {
      setIsLoading(false);
    }, 120);
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <LoadingPage />
        </div>
      ) : (
        auth ? (
          <RouterProvider router={ProjectRouter} />
        ) : (
          <RouterProvider router={LoginRouter} />
        )
      )}
    </>
  );
}

export default App;
