import { Request, Response, NextFunction } from "express";

export const checkPrivateRoute = (req: Request, res: Response, next: NextFunction) => {
  const currentUserId = res.locals.jwtPayload.userId;
  if (currentUserId == req.params.id) {
    next();
  } else {    
    res.status(401).send();
    return;
  }
};