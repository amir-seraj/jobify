import { UnauthenticatedError } from "../errors/index.js";

const checkPermission = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.userId.toString()) return;
  throw new UnauthenticatedError("Not Authorized to access this route!");
};

export default checkPermission;
