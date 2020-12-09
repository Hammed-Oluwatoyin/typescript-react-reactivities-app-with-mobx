import React , {useState}from 'react';
import {observer} from "mobx-react-lite";
import {useStores} from "../store/helpers/use-stores";

import TodoList from './TodoList';

 const UserList = () => {
    const [text , setText] = useState('');
    const {dataStores: {usersStore}} = useStores();
    const [currentUser, setCurrentUser] = useState(usersStore.users?.[0])

    return(

    <>
        <div>
        <ul>
        {usersStore.users.map(user =>
             {
                 return (
                     <li  key={user.id}>
                         <span onClick ={()=>setCurrentUser(user)}><h3>{user.name} </h3> </span>
                         <button onClick = {() => usersStore.removeUser(user.name)}><b>Remove User</b></button>
                     </li>
                 )
             }
        )}
        </ul>
       

        <TodoList user={currentUser} />
    
    </div>
    
       
    
    <div style={{marginTop: 50}}>
<input type="text" value={text} onChange={(e)=> setText(e.target.value)}/>
 <button onClick={() =>{ usersStore.addUser(text);
                        setText('');
                         }}>Add User</button>   
    </div>
        
</>
        
    )
}


export default observer(UserList);