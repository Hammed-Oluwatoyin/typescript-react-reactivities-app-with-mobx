import React , {useState, FC}from 'react';
import {observer} from "mobx-react-lite";
import {useStores} from "../store/helpers/use-stores";
import TodoComponent from "./Todo"
import User from '../store/data/users/user';


interface Props {
    user?: User
}

 const TodoList :FC<Props> = ({user}) => {
    const [text , setText] = useState('');
    const {dataStores: {todoStore}} = useStores();

    return(

    <div>
        <div style ={{marginBottom: "150px"}} >
       <h1><b>INCOMPLETED TODOS</b></h1> 
        {user ?
        user.inCompletedTodos.map(todo => <TodoComponent todo={todo} key={todo.id}/>) :
        todoStore.inCompletedTodos.map(todo => <TodoComponent todo={todo} key={todo.id}/>)}

        </div>

        <div>
       <div style={{marginTop: "100px"}}><h1>
       <b>COMPLETED TODOS</b>
           </h1></div> 
    {user ? user.completedTodos.map(todo => <TodoComponent todo={todo} key={todo.id}/>)
        : todoStore.completedTodos.map(todo => <TodoComponent todo={todo} key={todo.id}/>) }
    
    </div>
    <div style={{marginTop: 50}}>
<input type="text" value={text} onChange={(e)=> setText(e.target.value)}/>
 <button onClick={() =>{ todoStore.addTodo(text, user ? user.id :  999)
                        setText('');                            
                        }}>Add Todo</button>   
    </div>
        </div>

        
    )
}


export default observer(TodoList);