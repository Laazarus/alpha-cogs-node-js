import { IToken } from "../../models/interfaces";

export interface IApplicationService{
  login(email:string, password:string):Promise<IToken>;
}