import React, { SyntheticEvent } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {

    activities: IActivity[] ;
    handleSelectActivity: (id :string) => void;
    handleDeleteActivity: (event:SyntheticEvent<HTMLButtonElement> ,id: string ) => void;
    submitting : boolean;
    target: string


}


const ActivityList: React.FC<IProps> = ({activities, handleSelectActivity, handleDeleteActivity, submitting, target}) => {
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
            <Button  onClick={() => handleSelectActivity(activity.id)} floated="right" content="View" color="blue"/>
            <Button
            name ={activity.id}
             loading={target === activity.id &&submitting}
             onClick={(e) => handleDeleteActivity(e,activity.id)}
              floated="right" content="Delete" color="red"/>
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
