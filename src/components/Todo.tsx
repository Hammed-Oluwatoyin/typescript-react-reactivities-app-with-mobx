import React , {FC, useState} from "react";
import {observer} from "mobx-react-lite";
import Todo from "../store/data/todos/todo";


interface Props {
    todo:Todo;
}

 const TodoComponent: FC<Props> =({todo}) => {
    const [text, setText] = useState('');
    const [editMode, setEditMode] = useState(false);


    
    


     return (
         <React.Fragment>
             {
             editMode ? <input type="text" value={text}  onChange={ e => setText(e.target.value) }/>: 
              <div>{todo.name} - ${todo.userId}</div>
             }
             {
                 editMode ? <button onClick={()=>{
                     todo.updateName(text);
                     setEditMode(false);
                 }}>Save</button> :
                 <button onClick={() => setEditMode(true)}>Edit</button>
             }


     
     <button onClick = {() => todo.toggleTodo()}>ToggleTodo</button>
     <button onClick = {() => todo.remove()}>RemoveTodo</button>
         </React.Fragment>
    
     )
 }





 export default observer(TodoComponent);