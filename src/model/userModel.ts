// interface IUser {
//   name: string;
//   email: string;
//   mobilePhone: string;
// }

// export default class User implements IUser {
//   public name!: string;
//   public email!: string;
//   public mobilePhone!: string;
// }

export default class User {
  name: string;
  email: string;
  mobilePhone: string;

  constructor(name: string, email: string, mobilePhone: string) {
    (this.name = name), (this.email = email), (this.mobilePhone = mobilePhone);
  }
}
