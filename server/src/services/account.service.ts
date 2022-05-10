import AccountModel from "../models/account.model";

const createAccount = async (accountBody: any) => {
  const productType = await AccountModel.create(accountBody);
  return productType;
};

const accountService = {
  createAccount,
};

export default accountService;
