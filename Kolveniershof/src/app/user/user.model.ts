export class User {
  constructor(
    private _userName: string,
    private _firstName: string,
    private _lastName: string,
    private _email: string,
    //private _picture: string,
    private _admin: boolean,
    private _birthday: Date,
    private _absentDates: Date[]
  ) {}

  get userName(): string {
    return this._userName;
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

 /* get picture(): string {
    return this._picture;
  }*/

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
      json.username,
      json.firstName,
      json.lastName,
      json.email,
      //json.picture,
      json.admin,
      json.birthday,
      json.absentDates
    );
    return user;
  }

  toJSON(): any {
    return {
      userName: this.userName,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      //picture: this.picture,
      admin: this.admin,
      birthday: this.birthday,
      absentDates: this.absentDates
    };
  }
}
