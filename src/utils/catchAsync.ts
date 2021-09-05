import { NextFunction, Request, Response } from "express";

const catchAsync: Function = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((e: any) =>
      res.status(e.statusCode ? e.statusCode : 500).send(e)
    );
  };
};

export default catchAsync;
