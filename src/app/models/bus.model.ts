export class Bus {
  id: string;
  name: string;
  color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }

  static fromJSON(json: any): Bus {
    if ((json === undefined) || (json === null)) {
      return null;
    }
    const bus = new Bus(json.name, json.color);
    bus.id = json._id;
    return bus;
  }

  toJSON() {
    return {
      _id: this.id,
      name: this.name,
      color: this.color
    };
  }
}

Bus.prototype.toString = function() {
  return this.name;
};
