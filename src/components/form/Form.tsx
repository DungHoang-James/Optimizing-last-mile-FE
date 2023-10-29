import { forwardRef, type PropsWithChildren } from "react";

type Props = PropsWithChildren &
  React.FormHTMLAttributes<HTMLFormElement> &
  React.ClassAttributes<HTMLFormElement>;

const Form = forwardRef<HTMLFormElement, Props>(function Form(
  { children, ...rest },
  ref
): JSX.Element {
  return (
    <form ref={ref} {...rest}>
      {children}
    </form>
  );
});

export default Form;
