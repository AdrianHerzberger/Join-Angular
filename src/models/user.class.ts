export class User {
  name: string;
  email: string;
  password: string;
  birthDate: number;
  street: string;
  zipCode: number;
  city: string;

  constructor(obj?: any) {
    this.name = obj ? obj.name : '';
    this.email = obj ? obj.email : '';
    this.password = obj ? obj.password : '';
    this.birthDate = obj ? obj.birthDate : '';
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
  }

  public toJson() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      birthDate: this.birthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city
    };
  }
}