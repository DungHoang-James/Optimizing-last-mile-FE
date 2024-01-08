import {
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import type { FormEvent } from "react";

import Form from "@/components/form";

type Props = {
  handleChangeForm: (value: string) => void;
};

export default function LoginSelectorForm({ handleChangeForm }: Props) {
  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    const targetElement = event.target as HTMLSelectElement;

    handleChangeForm(targetElement.value);
  };

  return (
    <Form noValidate autoComplete="off" onChange={handleChange}>
      <FormControl
        sx={{
          mb: 2,
        }}
        fullWidth
      >
        <FormLabel id="login-selector-form">with:</FormLabel>
        <RadioGroup
          row
          aria-labelledby="login-selector-form"
          name="row-radio-buttons-group"
          sx={{
            background: "transparent",
          }}
          defaultValue={"username"}
        >
          <Stack
            spacing={1}
            direction={"row"}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <Card
              sx={{
                flexBasis: "100%",
                py: 0.875,
                px: 1.25,
                background: "transparent",
              }}
            >
              <FormControlLabel
                value="username"
                control={<Radio size={"small"} />}
                label="Username"
                defaultChecked
              />
            </Card>
            <Card
              sx={{
                flexBasis: "100%",
                py: 0.875,
                px: 1.25,
                background: "transparent",
              }}
            >
              <FormControlLabel
                value="email"
                control={<Radio size={"small"} />}
                label="Email"
                defaultChecked
              />
            </Card>
          </Stack>
        </RadioGroup>
      </FormControl>
    </Form>
  );
}
