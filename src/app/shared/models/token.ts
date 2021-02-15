import { NumberSymbol } from "@angular/common";

export class Token {
    privilegeLevel: number;
    firstName: string;
    lastName: string;
    exp: number;
    constructor() {
        this.privilegeLevel = 0;
        this.exp = 0;
    }
}