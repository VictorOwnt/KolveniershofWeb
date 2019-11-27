export class Activity {
  id: string;
  name: string;
  icon: string;

  constructor(name: string, icon: string) {
    this.name = name;
    this.icon = icon;
  }

  static fromJSON(json: any): Activity {
    if ((json === undefined) || (json === null)) { return null; }
    const activity = new Activity(json.name, json.icon);
    activity.id = json._id;
    return activity;
  }

  toJSON() {
    return {
      _id: this.id,
      name: this.name,
      icon: this.icon
    };
  }
}
