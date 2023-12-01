export enum STATUS_ENUM {
  ACTIVE = 0,
  INACTIVE = 1,
  NEW = 2,
  PENDING = 3,
  REJECT = 4,
}

export const STATUS: Status = {
  [STATUS_ENUM.ACTIVE]: { label: "Active", color: "success" },
  [STATUS_ENUM.INACTIVE]: { label: "Inactive", color: "default" },
  [STATUS_ENUM.NEW]: { label: "New", color: "primary" },
  [STATUS_ENUM.PENDING]: { label: "Pending", color: "warning" },
  [STATUS_ENUM.REJECT]: { label: "Reject", color: "error" },
};

export const DELETE = 6;
