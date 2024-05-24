import React, { useState } from 'react';
import { addUser, loginUser } from '../apiService';

const MyComponent = ({loggedInUsr,updateLoggedIn}) => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openNewAcc, setOpenNewAcc] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
        await loginUser(formData).then((res) => {
            setOpenLogin(false);
            setIsLoggedIn(true);
            updateLoggedIn(res);
        });
    } catch (error) {
        setErrorMsg('Email ou mot de passe incorrect')
    }
  };

  const handleSubmitNewAcc = async (event) => {
    event.preventDefault();
    try {
        await addUser(formData).then((res) => {
            setOpenNewAcc(false);
            setIsLoggedIn(true);
            updateLoggedIn(res);
        });
    } catch (error) {
        setErrorMsg('Vous avez déjà un compte avec cette adresse mail');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value});
  };

  const handleClose = (event) => {
    event.preventDefault();
    setOpenLogin(false);
    setOpenNewAcc(false);
  };

  let content;

  if (openLogin) {
    content = (
      <form className='login-body' onSubmit={handleSubmitLogin}>
        <label>
          Username:
          <input
            type="email"
            name="email"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={handleChange}
          />
        </label>
        <div>{errorMsg}</div>
        <br />
        <input className='btn-green' type="submit" value="Loggin" />
        <button className='btn-white' onClick={handleClose}>Fermer</button>
      </form>
    );
  } else if (openNewAcc) {
    content = (
      <form className='new-account-body' onSubmit={handleSubmitNewAcc}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={handleChange}
          />
        </label>
        <div>{errorMsg}</div>
        <br />
        <input className='btn-green' type="submit" value="Create Account" />
        <button className='btn-white' onClick={handleClose}>Fermer</button>
      </form>
    );
  } else if (!isLoggedIn) {
    content = (
      <div className='login-closed'>
        <button className='btn-green' onClick={() => setOpenLogin(true)}>Connexion</button>
        <button className='btn-green' onClick={() => setOpenNewAcc(true)}>Créer un compte</button>
      </div>
    );
  } else if (isLoggedIn) {
    content = (
        <button className='btn-green' onClick={() => setIsLoggedIn(false)}>Déconnexion</button>
    )
  }

  return <div>{content}</div>;
};

export default MyComponent;
