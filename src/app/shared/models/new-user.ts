import { User } from "./user";

export class NewUser implements User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    privilegeLevel: number;
}