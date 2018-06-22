import { injectable, inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import * as express from 'express';
import {Principal, IAuthService} from './auth.models';
import {IToken} from '../../models/interfaces';
import {TYPES} from '../../models/types';



@injectable()
export class CustomAuthProvider implements interfaces.AuthProvider {

    @inject(TYPES.IAuthService) private readonly _authService !: IAuthService;

    public async getUser( req: express.Request,res: express.Response, next: express.NextFunction ): Promise<interfaces.Principal> {
        console.log("req.originalUrl",req.originalUrl);
       if(req.originalUrl.indexOf("login")===-1 
       && req.originalUrl.indexOf("doc")===-1 
       && req.originalUrl.indexOf("favicon.ico")===-1){
        const token :IToken= {token:req.headers["x-auth-token"]as string};
        const user = await this._authService.getAuthorizedUser(token);
        const principal = new Principal(user);
        return principal;
       }
       console.log("returning empty");
       return  new Principal({});
    }

}