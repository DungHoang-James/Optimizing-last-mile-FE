import Label from "@/components/label";
import type { Color } from "@/components/label/Label";

type Status = {
  [key: number]: {
    label: string;
    color: Color;
  };
};

const STATUS: Status = {
  0: { label: "Active", color: "success" },
  1: { label: "Inactive", color: "default" },
  2: { label: "New", color: "primary" },
  3: { label: "Pending", color: "warning" },
  4: { label: "Reject", color: "error" },
};

type Props = {
  status: number;
};

export default function ManagerStatus({ status }: Props): JSX.Element {
  return <Label color={STATUS[status].color}>{STATUS[status].label}</Label>;
}
