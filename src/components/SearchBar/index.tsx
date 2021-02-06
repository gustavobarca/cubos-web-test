import React, { ReactElement, InputHTMLAttributes } from 'react';
import Input from './styles';

export default function TextInput(props: InputHTMLAttributes<HTMLInputElement>): ReactElement {
  return <Input id="search" {...props} />;
}
