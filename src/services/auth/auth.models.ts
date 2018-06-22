
import { interfaces } from "inversify-express-utils";
import { IToken } from "../../models/interfaces";
export class Principal implements interfaces.Principal {
    public details: IPrincipalDetails = {};
    public constructor(details: IPrincipalDetails) {
        if (details)
            this.details = details
    }
    public isAuthenticated(): Promise<boolean> {
        return Promise.resolve(true);
    }
    public isResourceOwner(resourceId: any): Promise<boolean> {
        return Promise.resolve(resourceId === 1111);
    }
    public isInRole(role: string): Promise<boolean> {
        return Promise.resolve(role === this.details.role as string);
    }
}
export interface IPrincipalDetails {
    [propertyName: string]: any
}
export interface IUsersAuthorized {
    [propertyName: string]: any
}

export interface IAuthService {
    generateToken(user: any): Promise<IToken>;
    getAuthorizedUser(token: IToken): Promise<any>;
}
