import React from 'react';
import {Grid} from 'semantic-ui-react';
import {IActivity} from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';


interface IProps {
    activities: IActivity[];
    handleSelectActivity: (id :string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode : ( editMode: boolean ) => void;
    setSelectedActivity: (selectedActivity: IActivity | null) => void;
    handleCreateActivity: (activity : IActivity ) => void
    handleEditActivity: (activity : IActivity ) => void
    handleDeleteActivity: (id: string) => void;
}

const ActivityDashboard: React.FC<IProps> = ({activities, handleSelectActivity, selectedActivity,
                                                 editMode ,setEditMode, setSelectedActivity, 
                                                 handleCreateActivity, handleEditActivity, handleDeleteActivity}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities} handleSelectActivity={handleSelectActivity} handleDeleteActivity={handleDeleteActivity} />
         </Grid.Column>
         <Grid.Column width={6}>
              {selectedActivity &&  !editMode && 
              <ActivityDetails 
               selectedActivity = {selectedActivity} 
               setEditMode = {setEditMode}  
               setSelectedActivity = {setSelectedActivity}/> } 
               {editMode && <ActivityForm  key = {selectedActivity && selectedActivity.id || 0}
                                            setEditMode ={setEditMode} selectedActivity = {selectedActivity}
                                            handleCreateActivity = {handleCreateActivity} handleEditActivity={handleEditActivity} /> } 
         </Grid.Column >

          </Grid>  
    )
}

export default ActivityDashboard;
