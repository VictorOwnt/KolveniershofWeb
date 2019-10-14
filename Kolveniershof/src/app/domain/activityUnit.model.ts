import { Activity } from './activity.model';
import { User } from '../user/user.model';

export class ActivityUnit{
    constructor(
        private _activity : Activity,
        private _mentors = new Array<User>(),
        private _clients = new Array<User>()
        ){}

        get activity() : Activity{
            return this._activity;
        }

        get mentors(): Array<User>{
            return this._mentors;
        }
        get clients(): Array<User>{
            return this._clients;
        }
}