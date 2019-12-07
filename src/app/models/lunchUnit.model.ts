import { User } from './user.model';

export class LunchUnit {
  id: string;
  lunch: string;
  mentors: User[];
  clients: User[];

  constructor(lunch: string, mentors: User[], clients: User[]) {
    this.lunch = lunch;
    this.mentors = mentors;
    this.clients = clients;
  }

  static fromJSON(json: any): LunchUnit {
    if ((json === undefined) || (json === null)) { return null; }
    const lunchUnit = new LunchUnit(
      json.lunch,
      json.mentors.map(User.fromJSON),
      json.clients.map(User.fromJSON)
    );
    lunchUnit.id = json._id;
    return lunchUnit;
  }

  toJSON(): any {
    return {
      _id: this.id,
      lunch: this.lunch,
      mentors: this.mentors.map(mentor => mentor.toJSON()),
      clients: this.clients.map(client => client.toJSON())
    };
  }
}

LunchUnit.prototype.toString = function() {
  return this.lunch;
};
