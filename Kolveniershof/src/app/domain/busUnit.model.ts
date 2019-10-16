import { Bus } from "./bus.model";
import { User } from "../user/user.model";

export class BusUnit {
  constructor(
    private _bus: Bus,
    private _mentors = new Array<User>(),
    private _clients = new Array<User>()
  ) {}

  static fromJSON(json: any): BusUnit {
    const busUnit = new BusUnit(
      json.bus,
      json.mentors.map(User.fromJSON),
      json.clients.map(User.fromJSON)
    );
    return busUnit;
  }

  toJSON(): any {
    return {
      bus: this.bus,
      mentors: this.mentors.map(ment => ment.toJSON()),
      clients: this.clients.map(client => client.toJSON())
    };
  }

  get bus(): Bus {
    return this._bus;
  }

  get mentors(): Array<User> {
    return this._mentors;
  }
  get clients(): Array<User> {
    return this._clients;
  }
}
