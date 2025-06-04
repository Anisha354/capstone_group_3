// eslint-disable-next-line import/prefer-default-export

export const createError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};
