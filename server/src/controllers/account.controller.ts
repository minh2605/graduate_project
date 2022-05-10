import { Request, Response } from "express";
import accountService from "../services/account.service";
import httpStatus from "http-status";

const createCategory = async (req: Request, res: Response) => {
  const newAccount = await accountService.createAccount(req.body);
  res.status(httpStatus.CREATED).send(newAccount);
};

const accountController = {
  createCategory,
};

export default accountController;
