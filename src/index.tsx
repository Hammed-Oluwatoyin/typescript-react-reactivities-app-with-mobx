import React from 'react';
import ReactDOM from 'react-dom';

import App from './App/App';
import reportWebVitals from './reportWebVitals';
import RootStore from "./store/root-store";



const rootStore = new RootStore();
console.log(rootStore);


// create 4 Users
rootStore.dataStores.usersStore.addUser('Hammed');
rootStore.dataStores.usersStore.addUser('Student 1');
rootStore.dataStores.usersStore.addUser('Student 2');
rootStore.dataStores.usersStore.addUser('Student 3');

//lets take the user so we can do actions on him
const newUser = rootStore.dataStores.usersStore.getUser('Hammed');

//lets add some todos to the user
rootStore.dataStores.todoStore.addTodo('finish The Exercise', newUser.id)
rootStore.dataStores.todoStore.addTodo('Learn Mobx', newUser.id);

console.log(`${newUser.name} Todos:${newUser.todos.map(todo => todo.name)}`);


//now we remove him
rootStore.dataStores.usersStore.removeUser('Hammed')
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
