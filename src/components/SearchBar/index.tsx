import React, { ReactElement, InputHTMLAttributes } from 'react';
import { InputContainer, Input } from './styles';

export default function TextInput(props: InputHTMLAttributes<HTMLInputElement>): ReactElement {
  return (
    <InputContainer>
      <Input {...props} />
    </InputContainer>
  );
}
