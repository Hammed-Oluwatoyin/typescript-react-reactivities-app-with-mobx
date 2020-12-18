 import React, {useState, useEffect, Fragment, SyntheticEvent} from 'react'
import axios from 'axios';
import { Container,  } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';


const App = () => {
  const[activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  


  useEffect(() => {
    agent.Activities.list()
    .then(response  => {
      let activities:IActivity[] = []; 
      response.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      })
      setActivities(activities);
    }
  ).then(() => {setLoading(false)})
  }, []);

  if (loading) {
    return <LoadingComponent content="....Loading activities" />
  }

 const handleSelectActivity = (id:string) : void => {
      setSelectedActivity(activities.filter( activity => activity.id === id)[0]);
      setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const  handleCreateActivity = (activity:IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity])
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => {setSubmitting(false)})
    
  }

  const handleEditActivity = (activity: IActivity ) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity])
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => {setSubmitting(false)})
   
  }

 const  handleDeleteActivity = ( e:SyntheticEvent<HTMLButtonElement>,  id : string) => {
   setTarget(e.currentTarget.name);
   setSubmitting(true);
   agent.Activities.delete(id).then(() => {
    setActivities ([...activities.filter(a => a.id !== id)]);
   }).then(() => setSubmitting(false))
     
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
                      submitting = {submitting}
                      target ={target}
       />
     </Container>
      
    </Fragment>
      
    
  )
    
  
}

export default App;