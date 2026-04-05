import { Request, Response, NextFunction } from "express";

// express type of middleware which also works for async too.
export type MiddlewareFunction = 
            (req: Request, res: Response, next: NextFunction) => void | Promise<void>;