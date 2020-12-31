/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityStore from '../../../app/stores/activityStore';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';



interface DetailsParams {
    id: string;
}


const ActivityDetails: React.FC<RouteComponentProps<DetailsParams>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);

    const {
        selectedActivity,

        loadActivity,
        loadingInitial

    } = activityStore;

    useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity]);

    if (loadingInitial || !selectedActivity) return <LoadingComponent content="Loading activity..." />


    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={selectedActivity} />
                <ActivityDetailedInfo activity={selectedActivity} />
                <ActivityDetailedChat />

            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails);
