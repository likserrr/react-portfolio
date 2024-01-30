import React, { FC } from 'react';

import styles from './css/todo.module.css';

const TodosInfoPage: FC = () => {
  return (
    <div className={styles.widget} style={{ height: '105%' }}>
      <h1>About The Widget</h1>
      <p style={{ textAlign: 'left' }}>
        &nbsp;&nbsp;<b>Work with:</b> states, events, localStorage, FC, dynamic
        render todos, typescript (interface, enum, events), todos data, css
        modules and just css (generate from scss in vsCode), wrapper tsx
        component
        <br />
        &nbsp;&nbsp;<b>Hooks:</b> useState, useEffect;
        <br />
        <br />
        &nbsp;&nbsp;
        <b>About widget:</b> the widget works with 2 states: todo (for
        rendering), todoRemoveId (for reassigning remote ids). The logic is
        divided into different components: "TodoEvents" is responsible for all
        changes from todo, "Todo" contains data for rendering one card,
        "TodosInfoPage" (the page where this text is located) and "TodosPage",
        where all components are connected, work with local storage and todo
        reset
        <br />
        &nbsp;&nbsp;<b>Interesting moments:</b> At first, the id for new todos
        was assigned via todo.lenght + 1, because if there are only 3 elements,
        then id 4 will be: 4. However, this caused bugs with the non-uniqueness
        of the key. So I started storing deleted ids in a state and reassigning
        them when new ones are added
        <br />
      </p>
      <p className={styles.widget_github}>
        Check the code !
        <br />
        <a href="https://github.com/likserrr" target="_blank">
          GitHub && this widget
        </a>
      </p>
      <p className={styles.author}>
        Author && Ostashkin Kirill
        <br />
        <a href="https://github.com/likserrr" target="_blank">
          GitHub && likserrr
        </a>
      </p>
    </div>
  );
};

export default TodosInfoPage;
