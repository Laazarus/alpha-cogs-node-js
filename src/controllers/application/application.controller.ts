import * as express from "express";
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../models/types";
import { IApplicationService } from "../../services/application/application.service.models";

@controller("/application")
export class ApplicationController implements interfaces.Controller  {
    
    
    constructor(@inject(TYPES.IApplicationService) private readonly applicationService: IApplicationService,
) { }

   

    @httpGet("/")
    private list(@queryParam("start") start: number, @queryParam("count") count: number): string {
        
        console.log("get")
        return "";
    }

    @httpPost("/login")
    private async create(@request() req: express.Request, @response() res: express.Response) {
        try {
            console.log("called post")
          let token=  await this.applicationService.login(req.body.email, req.body.password);
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(token));
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    @httpDelete("/:id")
    private delete(@requestParam("id") id: string, @response() res: express.Response): Promise<void> {
        /*  return this.fooService.delete(id)
             .then(() => res.sendStatus(204))
             .catch((err: Error) => {
                 res.status(400).json({ error: err.message });
             }); */
        console.log("called delete")
        return new Promise<void>((resolve, rej) => {
            resolve();
        })
    }
}