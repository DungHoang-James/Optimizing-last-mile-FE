import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  pathname: string;
};

export default function GoBackButton({ pathname }: Props) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate({ pathname });
  };

  return (
    <Button
      sx={{
        color: "grey.600",
      }}
      size={"medium"}
      variant={"text"}
      startIcon={<ArrowBackIcon />}
      onClick={handleGoBack}
    >
      Go back
    </Button>
  );
}
