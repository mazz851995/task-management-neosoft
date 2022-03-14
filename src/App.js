import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Home from './components/Home';
import Login from './components/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Error from './components/Error';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_USERS" });
  }, [dispatch])


  return (
    <>
      <ToastContainer />
      <Router>
        <Switch>

          <Route exact path="/" component={() => <Signup />} />
          <Route exact path="/home" component={() => <Home />} />
          <Route exact path="/login" component={() => <Login />} />
          <Route component={() => <Error />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
