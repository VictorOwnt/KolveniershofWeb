import {Bus} from './bus.model';
import {User} from './user.model';

export class BusUnit {
  id: string;
  bus: Bus;
  mentors: User[];
  clients: User[];

  constructor(bus: Bus, mentors: User[], clients: User[]) {
    this.bus = bus;
    this.mentors = mentors;
    this.clients = clients;
  }

  static fromJSON(json: any): BusUnit {
    if ((json === undefined) || (json === null)) {
      return null;
    }
    const busUnit = new BusUnit(
      Bus.fromJSON(json.bus),
      json.mentors.map(User.fromJSON),
      json.clients.map(User.fromJSON)
    );
    busUnit.id = json._id;
    return busUnit;
  }

  toJSON() {
    return {
      _id: this.id,
      bus: this.bus.toJSON(),
      mentors: this.mentors.map(mentor => mentor.toJSON()),
      clients: this.clients.map(client => client.toJSON())
    };
  }
}
