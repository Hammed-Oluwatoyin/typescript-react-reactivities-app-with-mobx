import React from "react";

import "./App.css";
import TodoList from "../components/TodoList";
import {Views} from "../store/ui/global-view";
import { useStores } from "../store/helpers/use-stores";
import { observer } from "mobx-react-lite";
import UserList from "../components/UserList";



const App =  ( )=> {
  
 const {uiStores: {globalView}} = useStores();

 const getView = () =>{
   if(globalView.currentView === Views.Todos) {
     return <TodoList />
   }

   if(globalView.currentView === Views.Users) {
     return <UserList/>;
   }
   
 }

  return (
    <div className="App__body">
      <div style={{marginRight: "1000px"}}>
      <button onClick={() => globalView.setView(Views.Todos)}>Todos</button>
     <button onClick={() => globalView.setView(Views.Users)}>Users</button>
      </div>
      {getView()}
    </div>
  
  );
};

export default observer(App);
