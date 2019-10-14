import { User } from '../user/user.model';

export class LunchUnit{
    constructor(
        private _mentors = new Array<User>(),
        private _clients = new Array<User>()
    ){}

    get mentors() : Array<User>{
        return this._mentors;
    }

    get clients(): Array<User>{
        return this._clients;
    }
}