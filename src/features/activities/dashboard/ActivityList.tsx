import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {

    activities: IActivity[] ;
    handleSelectActivity: (id :string) => void;
    handleDeleteActivity: (id: string ) => void;

}


const ActivityList: React.FC<IProps> = ({activities, handleSelectActivity, handleDeleteActivity}) => {
    return (
        
        <Segment clearing>
        <Item.Group divided>
        {activities.map(activity => (
            <Item key={activity.id}>
            <Item.Content>
             <Item.Header as="a">{activity.title} </Item.Header>
        <Item.Meta>{activity.date}</Item.Meta>
        <Item.Description>
            <div><b>{activity.description}</b></div>
            <div><b>{activity.city}, {activity.venue}</b></div>
        </Item.Description>
            <Item.Extra>
            <Button onClick={() => handleSelectActivity(activity.id)} floated="right" content="View" color="blue"/>
            <Button onClick={() => handleDeleteActivity(activity.id)} floated="right" content="Delete" color="red"/>
            <Label basic content={activity.category}/>
            </Item.Extra>

         </Item.Content>
            </Item>
           ))}
          
        
        </Item.Group>
    </Segment>
        
            
        
    )
}

export default ActivityList
