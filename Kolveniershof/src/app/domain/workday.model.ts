
import { User } from '../user/user.model';
import { ActivityUnit } from './activityUnit.model';
import { LunchUnit } from './lunchUnit.model';

import { BusUnit } from './busUnit.model';

export class workday{
    constructor(
        private _date = new Date(),
        private _amActivities = new Array<ActivityUnit>(),
        private _pmActivities = new Array<ActivityUnit>(),
        private _mentors = new Array<User>(),
        private _lunch : LunchUnit,
        private _amBusses = new Array<BusUnit>(),
        private _pmBusses = new Array<BusUnit>(),
        private _holiday : boolean
        
    ){}

    get date(): Date{
        return this._date;
    }
    get amActivities(): Array<ActivityUnit>{
        return this._amActivities;
    }
    get pmActivities(): Array<ActivityUnit>{
        return this._pmActivities;
    }
    get mentors(): Array<User>{
        return this._mentors;
    }
    get lunch(): LunchUnit{
        return this._lunch;
    }
    get amBusses(): Array<BusUnit>{
        return this._amBusses;
    }
    get pmBusses(): Array<BusUnit>{
        return this._pmBusses;
    }
}