import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckRole implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('<Check Role Middleware>');
    console.log(req)
    next();
  }
}
