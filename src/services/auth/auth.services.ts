import { injectable, inject } from "inversify"

import * as jwt from 'jsonwebtoken';
import { IToken, IClaim } from '../../models/interfaces';
const securerandom = require('secure-random');
import { IUsersAuthorized, IAuthService } from './auth.models';
import { TYPES } from '../../models/types';
import { IDB } from "src/services/DB/db.test.models";

@injectable()
export class AuthService implements IAuthService {
  @inject(TYPES.IDB)
  private readonly dbservice!: IDB;
  private users: IUsersAuthorized = {};
  public async generateToken(user: any): Promise<IToken> {
    try {
      const claim: IClaim = {
        iss: "locahost",
        sub: "",
        fullname: user.name,
        email: user.email,
        scope: user.role
      }
      const sk: string = securerandom(256, { type: 'Buffer' });
      claim.sub = user.id;
      this.users[user.id] = {
        signingKey: sk,
        user: user
      }
      return new Promise<IToken>(resolve => {
        resolve({ token: jwt.sign(claim, sk) });
      })
    } catch (error) {
      return Promise.reject(error.message)
    }
  }
  private async verify(token: string): Promise<string> {
    try {
      var decoded = jwt.decode(token) as IClaim;
      console.log("decoded user", decoded)
      jwt.verify(token, this.users[decoded.sub].signingKey);
      return new Promise<string>(resolve => resolve(decoded.sub));
    } catch (error) {
      console.log("error", error)
      return Promise.reject(error);
    }
  }
  public async getAuthorizedUser(token: IToken): Promise<any> {
    let id: string = await this.verify(token.token);
    return new Promise<any>(resolve => { resolve(this.users[id].user) })
  }
}