import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import MainContainer from './MainContainer/MainContainer';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import axios from "axios";

const ENDPOINT = "http://proyectofinalbootcamp-env.eba-nmb4rsib.us-east-2.elasticbeanstalk.com/";

function UnderConstruction() {
  return (
    <div className="myProfile">
      <h1 className="myProfile__title">Talent G</h1>
      <p className="myProfile__subtitle">Under Construction</p>
    </div>
  );
}

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isTrainer, setIsTrainer] = useState(false);
  const [initialData, setInitialData] = useState({
    email: "test",
    firstName: "Victor",
    lastName: "Cruz",
    status: false,
    location: "CDMX",
    training: {
      trainingName: "UI"
    }
  });

  function handleInitial(res) {
    setInitialData((prev) => ({
      ...prev,
      ...res
    }));
  }

  function handleLogin(mail, password, isTrainer) {
    setIsTrainer(isTrainer);
    let train = isTrainer ? "trainer" : "student";

    let config = {
      method: 'post',
      url: ENDPOINT + train + '/login?email=' + mail,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': '*/*'
      }
    };

    axios(config)
      .then(((response) => {
        handleInitial(response.data.content);
      }))
      .catch(function (error) {
        console.log(error);
      });

    setIsLogin(()=>true);
  }

  function handleLogout() {
    setIsLogin(() => false);
  }

  return isLogin ?
    <>
      <Router>
        <div className="App">
          <Header logout={handleLogout} />
          <Switch>
            <Route exact path='/'>
              <MainContainer initialData={initialData} isTrainer={isTrainer} />
            </Route>
            <Route path='/myProfile' component={UnderConstruction} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </>
    : <Login login={handleLogin} />
}

export default App;
