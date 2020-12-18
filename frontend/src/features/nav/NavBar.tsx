import React from 'react'
import { Menu , Container, Button} from 'semantic-ui-react'


interface IProps {
  handleOpenCreateForm : () => void;
}
const NavBar: React.FC<IProps> = ({handleOpenCreateForm}) => {
    return (
        
         <Menu fixed="top" inverted={true} >
           <Container >
           <Menu.Item header>
             <img src="/assets/logo.png" alt="logo"  style={{marginRight: "10px"}}/>
            Reactivities
            </Menu.Item> 
            <Menu.Item  name="Activities"/>

            <Menu.Item> 
              <Button  onClick = {() => {handleOpenCreateForm()}} positive content="create Activity" />
            </Menu.Item>
             
      
           </Container>
        
      </Menu>
        
    )
}

export default NavBar;
