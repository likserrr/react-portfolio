import React, { FC, useEffect, useRef, useState } from 'react';
import './css/AuthStyles.css';
import { IUser } from './IUser';
import PostService from './PostService';

// Use env This

enum typesInfoText {
  queryLoad = 'queryLoad',
  authCheck = 'authCheck',
}

interface infoText {
  type: typesInfoText;
  message?: string;
}

const AuthPage: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [testUserInd, setTestUserInd] = useState(0);

  const [inputEmailValue, setInputEmailValue] = useState<string>('');
  const [inputPasswordValue, setInputPasswordValue] = useState<string>('');

  const [infoText, setInfoText] = useState<infoText>({
    type: typesInfoText.queryLoad,
    message: '',
  });

  const [errorMes, setErrorMes] = useState<string>('');

  useEffect(() => {
    getDataUsers();
  }, []);

  async function getDataUsers() {
    const answer = await PostService.indexPost();
    const users = answer.data;
    setUsers(users);
  }

  function changeUser() {
    if (testUserInd === 9) return setTestUserInd(0);
    setTestUserInd((prevIndex) => prevIndex + 1);
  }

  function fillInputs(user: IUser) {
    setInputEmailValue(user.username);
    setInputPasswordValue(user.website);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInfoText({
      type: typesInfoText.authCheck,
      message: 'Запрашиваю сервер...',
    });
    const username = inputEmailValue;
    const password = inputPasswordValue;
    if (username === '') return setErrorMes('Username is null');
    if (password === '') return setErrorMes('Password is null');

    const query = await PostService.authUserPost(username, password);
    const authUser = query.data;
    if (authUser.length) {
      setErrorMes('');
      setInfoText({
        type: typesInfoText.authCheck,
        message: 'Success!!!',
      });
      return;
    }
    setErrorMes('Пользователь не найден');
    setInfoText({
      type: typesInfoText.queryLoad,
    });
  };

  function inputPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputPasswordValue(event.target.value);
  }

  function inputEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputEmailValue(event.target.value);
  }

  function setErrorMesNull() {
    setErrorMes('');
  }

  return (
    <div className="widget">
      {!users ? (
        <h1>1 Second...</h1>
      ) : (
        <>
          <h1>AuthForm</h1>

          {infoText.type === typesInfoText.queryLoad && (
            <p>
              Я подгрузил пользователей из jsonplaceholder
              <br />
              Для примера можете авторизоваться как{' '}
              {users[testUserInd]?.username}
            </p>
          )}

          {infoText.type === typesInfoText.authCheck && (
            <p>
              {infoText.message}
              <br />
            </p>
          )}
          <p style={{ marginTop: '5px' }}>
            username: {users[testUserInd]?.username}
            <br />
            password: {users[testUserInd]?.website}
          </p>
          <div style={{ marginTop: '5px' }} className="operators">
            <p onClick={() => fillInputs(users[testUserInd])}>
              Вставить значения
            </p>
            <p onClick={changeUser}>Другой пользователь</p>
          </div>
          <p className="error">{errorMes}</p>
          <form onSubmit={handleSubmit} className="auth">
            <input
              onFocus={setErrorMesNull}
              value={inputEmailValue}
              onChange={(e) => inputEmailChange(e)}
              placeholder="Typing username..."
              type="text"
            />
            <input
              onFocus={setErrorMesNull}
              value={inputPasswordValue}
              onChange={(e) => inputPasswordChange(e)}
              placeholder="Typing password..."
              type="text"
            />
            <button type="submit">Send</button>
          </form>
        </>
      )}
    </div>
  );
};

export default AuthPage;
