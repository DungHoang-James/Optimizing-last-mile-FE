export const ACTIVE = 0;
export const INACTIVE = 1;
export const NEW = 2;
export const PENDING = 3;
export const REJECT = 4;

export const STATUS: Status = {
  [ACTIVE]: { label: "Active", color: "success" },
  [INACTIVE]: { label: "Inactive", color: "default" },
  [NEW]: { label: "New", color: "primary" },
  [PENDING]: { label: "Pending", color: "warning" },
  [REJECT]: { label: "Reject", color: "error" },
};
