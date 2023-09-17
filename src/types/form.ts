import type { CompoundedComponent } from 'antd/es/float-button/interface';
import type { InputRef, PasswordProps } from 'antd/es/input';

export type FormType<T extends {}> = {
  name: keyof T;
  label: string;
  Component: CompoundedComponent | React.ForwardRefExoticComponent<PasswordProps & React.RefAttributes<InputRef>>;
};
