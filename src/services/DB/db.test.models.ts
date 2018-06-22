export interface IDB{
    findUserById(id: string): any;
    findUserByUsernamePassword(email: string,password:string): any;
}