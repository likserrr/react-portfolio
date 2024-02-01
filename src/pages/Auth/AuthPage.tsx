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
  const [users, setUsers] = useState<IUser[]>();
  const [testUserInd, setTestUserInd] = useState(0);

  const [infoText, setInfoText] = useState<infoText>({
    type: typesInfoText.queryLoad,
    message: '',
  });

  const EmailRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);

  const [errorMes, setErrorMes] = useState<string>('');

  useEffect(() => {
    getDataUsers();
  }, []);

  async function getDataUsers() {
    const answer = await PostService.indexPost();
    const users: IUser[] = answer.data;
    setUsers(users);
  }

  function changeUser() {
    if (testUserInd == 9) return setTestUserInd(0);
    setTestUserInd((prevIndex) => prevIndex + 1);
  }

  function appendInputs(user: IUser) {
    console.log(infoText.type === typesInfoText.queryLoad ?? '123');
    if (EmailRef.current) EmailRef.current.value = user.username;
    if (PasswordRef.current) PasswordRef.current.value = user.website;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInfoText({
      type: typesInfoText.authCheck,
      message: 'Запрашиваю сервер...',
    });
    const username = EmailRef.current?.value;
    const password = PasswordRef.current?.value;
    if (!username) return setErrorMes('Username is null');
    if (!password) return setErrorMes('Password is null');

    const query = await PostService.authUserPost(username, password);
    const authUser: IUser[] = query.data;
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

  return (
    <div className="widget">
      {!users ? (
        <h1>1 Second...</h1>
      ) : (
        <>
          <h1>AuthForm</h1>

          {infoText.type === typesInfoText.queryLoad ? (
            <p>
              Я подгрузил пользователей из jsonplaceholder
              <br />
              Для примера можете авторизоваться как{' '}
              {users[testUserInd].username}
            </p>
          ) : (
            <></>
          )}

          {infoText.type === typesInfoText.authCheck ? (
            <p>
              {infoText.message}
              <br />
            </p>
          ) : (
            <></>
          )}

          <p style={{ marginTop: '5px' }}>
            username: {users[testUserInd].username}
            <br />
            password: {users[testUserInd].website}
          </p>
          <div style={{ marginTop: '5px' }} className="operators">
            <p onClick={() => appendInputs(users[testUserInd])}>
              Вставить значения
            </p>
            <p onClick={() => changeUser()}>Другой пользователь</p>
          </div>
          <p className="error">{errorMes}</p>
          <form onSubmit={handleSubmit} className="auth">
            <input
              onFocus={() => setErrorMes('')}
              ref={EmailRef}
              placeholder="Typing username..."
              type="text"
            />
            <input
              onFocus={() => setErrorMes('')}
              ref={PasswordRef}
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
