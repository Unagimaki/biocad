import { forwardRef, ChangeEvent } from 'react';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, name }, ref) => (
    <input type="text" name={name} value={value} onChange={onChange} ref={ref} />
  )
);
