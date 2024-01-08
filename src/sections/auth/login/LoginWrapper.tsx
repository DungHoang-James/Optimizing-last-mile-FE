import { useState } from "react";

import { LoginEmailForm, LoginForm, LoginSelectorForm } from ".";

export default function LoginWrapper() {
  const [typeForm, setTypeForm] = useState<string>("username");

  const handleChangeForm = (value: string) => {
    setTypeForm(value);
  };

  return (
    <>
      <LoginSelectorForm handleChangeForm={handleChangeForm} />
      {typeForm === "username" ? <LoginForm /> : <LoginEmailForm />}
    </>
  );
}
