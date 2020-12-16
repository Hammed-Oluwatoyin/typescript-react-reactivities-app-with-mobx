import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios';
import { Container,  } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


const App = () => {
  const[activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:9000/api/activities")
    .then(response  => {
      let activities:IActivity[] = []; 
      response.data.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      })
      setActivities(activities);
    }
  )
  }, []);

 const handleSelectActivity = (id:string) : void => {
      setSelectedActivity(activities.filter( activity => activity.id === id)[0]);
      setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const  handleCreateActivity = (activity:IActivity) => {
    setActivities([...activities, activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity ) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }

 const  handleDeleteActivity = (id : string) => {
      setActivities ([...activities.filter(a => a.id !== id)]);
  }



  return (

    <Fragment>
<NavBar  handleOpenCreateForm ={handleOpenCreateForm}/>
     <Container style={{marginTop: "7em"}}>
    <ActivityDashboard activities={activities}
                       handleSelectActivity = {handleSelectActivity}
                      selectedActivity = {selectedActivity}
                      setSelectedActivity = {setSelectedActivity}
                      editMode = {editMode}
                      setEditMode = {setEditMode}
                      handleCreateActivity= {handleCreateActivity}
                      handleEditActivity = {handleEditActivity}
                      handleDeleteActivity = {handleDeleteActivity}
       />
     </Container>
      
    </Fragment>
      
    
  )
    
  
}

export default App;