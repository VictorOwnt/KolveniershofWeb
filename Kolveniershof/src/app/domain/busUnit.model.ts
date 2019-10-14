import { Bus } from './bus.model';
import { User } from '../user/user.model';

export class BusUnit{
    constructor(
        private _bus : Bus,
        private _mentors = new Array<User>(),
        private _clients = new Array<User>()
        ){}
        
        get bus() : Bus{
            return this._bus;
        }

        get mentors() : Array<User>{
            return this._mentors;
        }
        get clients() : Array<User>{
            return this._clients;
        }
}