import Label from "@/components/label";
import { STATUS } from "@/utils/constants";

type Props = {
  status: number;
};

export default function ManagerStatus({ status }: Props): JSX.Element {
  return <Label color={STATUS[status].color}>{STATUS[status].label}</Label>;
}
