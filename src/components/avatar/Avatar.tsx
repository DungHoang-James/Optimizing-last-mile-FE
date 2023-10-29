import type { AvatarProps } from "@mui/material";
import { Avatar as MuiAvatar } from "@mui/material";

export default function Avatar({ ...rest }: AvatarProps): JSX.Element {
  return <MuiAvatar {...rest} src={"https://joesch.moe/api/v1/random"} />;
}
