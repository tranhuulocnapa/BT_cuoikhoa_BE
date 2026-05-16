export const USER_TYPES = {
  ADMIN: 'QuanTriVien',
  USER: 'KhachHang',
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10,11}$/,
} as const;

export const HTTP_STATUS_MESSAGES = {
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  NOT_FOUND: 'Resource not found',
  CONFLICT: 'Resource already exists',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden',
} as const;
