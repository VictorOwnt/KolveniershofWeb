export class Bus {
  id: string;
  name: string;
  color: string;
  icon: string;

  constructor(name: string, color: string, icon: string) {
    this.name = name;
    this.color = color;
    this.icon = icon;
  }

  static fromJSON(json: any): Bus {
    const bus = new Bus(json.name, json.color, json.icon);
    bus.id = json._id;
    return bus;
  }

  toJSON() {
    return {
      _id: this.id,
      name: this.name,
      color: this.color,
      icon: this.icon
    };
  }
}
