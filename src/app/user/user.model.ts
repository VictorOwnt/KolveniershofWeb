export class User {
  constructor(
    private _id: string,
    private _firstName: string,
    private _lastName: string,
    private _email: string,
    private _admin: boolean,
    private _birthday: Date,
    private _absentDates: Date[]
  ) {}

  get id(): string {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  get admin(): boolean {
    return this._admin;
  }

  get birthday(): Date {
    return this._birthday;
  }

  get absentDates(): Date[] {
    return this._absentDates;
  }

  static fromJSON(json: any): User {
    const user = new User(
      json._id,
      json.firstName,
      json.lastName,
      json.email,
      json.admin,
      json.birthday,
      json.absentDates
    );
    return user;
  }

  toJSON(): any {
    return {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      admin: this.admin,
      birthday: this.birthday,
      absentDates: this.absentDates
    };
  }
}
