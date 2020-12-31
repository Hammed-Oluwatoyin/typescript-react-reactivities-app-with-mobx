import { observer } from 'mobx-react-lite';
import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const NavBar: React.FC = () => {


  return (

    <Menu fixed="top" inverted={true} >
      <Container >
        <Menu.Item header as={NavLink} to='/' exact>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: "10px" }} />
            Reactivities
            </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to='/activities' />

        <Menu.Item>
          < Button
            as={NavLink} to='/createActivity'

            positive
            content="create Activity" />
        </Menu.Item>


      </Container>

    </Menu>

  )
}

export default observer(NavBar);
