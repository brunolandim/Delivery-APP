import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTokenUser from '../helpers/useTokenUser';
import Input from '../components/Inputs/Default';
import testId from '../helpers/dataTestIds';
import Button from '../components/Buttons';
import { executeLogin } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [failedLogin, setFailedLogin] = useState(false);
  const user = useTokenUser();
  const Navigate = useNavigate();

  useEffect(() => {
    if (user.payload) {
      const { role, name } = user.payload;
      switch (role) {
      case 'administrator':
        return Navigate('/manager', { state: { role, name } });
      case 'seller':
        return Navigate('/seller', { state: { role, name } });
      default:
        return Navigate('/user', { state: { role, name } });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    // regex from https://pt.stackoverflow.com/q/1386 porém modificado para incluir .br corretamente (nem precisava)
    const testeEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(.[a-z]+)?$/i;
    const passLength = 6;
    const teste = testeEmail.test(email) && password.length >= passLength;
    setIsDisabled(!teste);
  }, [email, password]);

  const handleChange = ({ target }) => {
    const { id, value } = target;
    if (id === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const setTokenLocalStorage = (token) => localStorage.setItem('token', token);

  const login = async (event) => {
    event.preventDefault();
    console.log('login clicked', email, password);
    const endpoint = '/login';
    const { token } = await executeLogin(endpoint, { email, password });
    console.log(token);
    return token ? setTokenLocalStorage(token) : setFailedLogin(true);
  };

  return (
    <main>
      <form action="">
        <Input
          name="Login"
          id="email"
          type="email"
          placeholder="email@email.com"
          testId={ testId[1] }
          change={ handleChange }
        />
        <Input
          name="Senha"
          id="password"
          type="password"
          placeholder="**********"
          testId={ testId[2] }
          change={ handleChange }
        />
        <Button
          type="button"
          textButton="Login"
          classButton="btn-1"
          testId={ testId[3] }
          disabled={ isDisabled }
          clicked={ (event) => login(event) }
        />
        <Button
          type="submit"
          textButton="Ainda não tenho conta"
          classButton="btn-3"
          testId={ testId[4] }
          disabled={ false }
          clicked={ () => false }
        />
      </form>
      {
        (failedLogin)
          ? (
            <span data-testid={ testId[5] }> MENSAGEM de ERRO do back hidden</span>
          ) : null
      }
    </main>
  );
}
