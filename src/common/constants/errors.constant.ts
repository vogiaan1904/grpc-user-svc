import { ErrorCode } from '../../protos/user.pb';

export const UserErrors = {
  OK: {
    code: ErrorCode.OK,
    message: 'Success',
  },
  USER_NOT_FOUND: {
    code: ErrorCode.USER_NOT_FOUND,
    message: 'User not found',
  },
  USER_ALREADY_EXISTS: {
    code: ErrorCode.USER_ALREADY_EXISTS,
    message: 'User already exists',
  },
  INVALID_USER_DATA: {
    code: ErrorCode.INVALID_USER_DATA,
    message: 'Invalid user data',
  },
  USER_DELETED: {
    code: ErrorCode.USER_DELETED,
    message: 'User has been deleted',
  },
  USER_INACTIVE: {
    code: ErrorCode.USER_INACTIVE,
    message: 'User account is inactive',
  },
  USER_SUSPENDED: {
    code: ErrorCode.USER_SUSPENDED,
    message: 'User account is suspended',
  },
  USER_BLOCKED: {
    code: ErrorCode.USER_BLOCKED,
    message: 'User account is blocked',
  },
  UNRECOGNIZED: {
    code: ErrorCode.UNRECOGNIZED,
    message: 'Unknown error occurred',
  },
};
