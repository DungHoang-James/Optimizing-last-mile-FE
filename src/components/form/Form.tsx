import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & React.FormHTMLAttributes<HTMLFormElement>;

function Form({ children, ...rest }: Props): JSX.Element {
  return <form {...rest}>{children}</form>;
}

export default Form;
