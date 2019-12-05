export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  street: string;
  postalCode: string;
  city: string;
  admin: boolean;
  birthday: Date;
  absentDates: Date[];

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    picture: string,
    /*street: string,
    postalCode: string,
    city: string,*/
    admin: boolean,
    birthday: Date,
    absentDates: Date[]
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.picture = picture;
    /*this.street = street;
    this.postalCode = postalCode;
    this.city = city;*/
    this.admin = admin;
    this.birthday = birthday;
    this.absentDates = absentDates;
  }

  static fromJSON(json: any): User {
    if ((json === undefined) || (json === null)) { return null; }
    const user = new User(
      json.firstName,
      json.lastName,
      json.email,
      json.picture,
      /*json.address.street,
      json.address.postalCode,
      json.address.city,*/
      json.admin,
      json.birthday,
      json.absentDates
    );
    user.id = json._id;
    return user;
  }

  toJSON(): any {
    return {
      _id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      picture: this.picture,
      /*address: {
        street: this.street,
        postalCode: this.postalCode,
        city: this.city
      },*/
      admin: this.admin,
      birthday: this.birthday,
      absentDates: this.absentDates
    };
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}

User.prototype.toString = function() {
  return this.firstName + ' ' + this.lastName;
};
