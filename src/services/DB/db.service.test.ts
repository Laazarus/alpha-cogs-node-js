import { IDB } from "./db.test.models";
import { injectable } from "inversify";

@injectable()
export class DB implements IDB {
 
    private readonly usersDB: any = [{ id: "1", name: "Nicola", role: "admin", email: "nicolacogotti@hotmail.com" , password:"123"}, { id: "2", name: "Anastasia", role: "admin", email: "anastasiapuchkova@hotmail.com", password:"123"}];
    findUserById(id: string): any {
        return this.usersDB.filter((u: any) => u.id === id)[0];
    }
    findUserByUsernamePassword(email: string, password: string) {
        return this.usersDB.filter((u: any) => u.email === email && u.password===password)[0];
    }
}