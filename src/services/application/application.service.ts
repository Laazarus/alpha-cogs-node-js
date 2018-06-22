import {injectable, inject} from "inversify"
import {IApplicationService} from "./application.service.models";
import {IToken} from "../../models/interfaces";
import {IDB} from "src/services/DB/db.test.models";
import {TYPES} from "../../models/types";
import {IAuthService} from "../auth/auth.models";

@injectable()
export class ApplicationService implements IApplicationService {
  @inject(TYPES.IDB)
  private readonly dbservice!: IDB;
  @inject(TYPES.IAuthService) private readonly authService!: IAuthService
  async  login(email: string, password: string): Promise<IToken> {
    console.log(`called service login with user ${email} and password ${password}`)
    let user = this.dbservice.findUserByUsernamePassword(email, password);
    let token = await this.authService.generateToken(user);
    return new Promise<IToken>(resolve => resolve(token));
  }
}