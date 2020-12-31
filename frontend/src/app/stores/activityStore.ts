import { action, computed, configure, makeObservable, runInAction } from 'mobx';
import { observable } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';
import { IActivity } from '../models/activity';

configure({ enforceActions: 'always' })

class ActivityStore {
    @observable activityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';



    constructor() {
        makeObservable(this, {
            activityRegistry: observable,
            activities: observable,
            loadingInitial: observable,
            selectedActivity: observable,
            submitting: observable,

            loadActivities: action,
            loadActivity: action,
            handleDeleteActivity: action,
            handleCreateActivity: action,
            clearActivity: action,
            handleEditActivity: action,

            activitiesByDate: computed,


        })
    }

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
    }


    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        )
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date.split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as { [key: string]: IActivity[] }));

    }









    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list()
            runInAction(() => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('.')[0];
                    this.activityRegistry.set(activity.id, activity);
                })
                this.activities = Array.from(this.activityRegistry.values());
                this.loadingInitial = false;
            });

        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error);
        }
    }

    @action clearActivity = () => {
        this.selectedActivity = null;
    }

    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
        } else {
            try {
                activity = await agent.Activities.details(id);
                runInAction(() => {
                    this.selectedActivity = activity;
                    this.loadingInitial = false;
                })
            } catch (error) {
                runInAction(() => {
                    this.loadingInitial = false;
                })
                console.log(error);


            }

        }



    }




    @action handleEditActivity = async (activity: IActivity) => {

        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.submitting = false;
            })


        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })

            console.log(error);
        }
    }



    @action handleCreateActivity = async (activity: IActivity) => {

        this.submitting = true;

        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity)

                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
            console.log(error);
        }
    }




    @action cancelSelectedActivity = () => {
        this.selectedActivity = null;
    }





    @action handleDeleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {

        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
                this.target = "";
            })

            console.log(error);

        }
    }

}






export default createContext(new ActivityStore());
