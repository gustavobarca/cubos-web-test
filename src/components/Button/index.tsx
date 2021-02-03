import React, { ReactElement, ButtonHTMLAttributes } from 'react';
import ButtonContainer from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: string;
}

export default function Button(props: Props): ReactElement {
  const { text, color } = props;

  return (
    <ButtonContainer {...props} type="button" color={color}>
      {text}
    </ButtonContainer>
  );
}

Button.defaultProps = {
  color: '',
};
