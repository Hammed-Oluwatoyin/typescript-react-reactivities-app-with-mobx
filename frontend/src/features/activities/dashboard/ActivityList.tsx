import { observer } from 'mobx-react-lite';
import React, { useContext, Fragment } from 'react'

import { Label, Item } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity';
import ActivityStore from "../../../app/stores/activityStore"
import ActivityListItem from './ActivityListItem';




const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate } = activityStore;
    return (
        <Fragment>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Label size='large' color='blue'>
                        {group}
                    </Label>

                    <Item.Group divided>
                        {
                            activities.map((activity: IActivity) => (
                                <ActivityListItem key={activity.id} activity={activity} />
                            ))
                        }


                    </Item.Group>

                </Fragment>

            ))
            }
        </Fragment>





    )
}

export default observer(ActivityList);
