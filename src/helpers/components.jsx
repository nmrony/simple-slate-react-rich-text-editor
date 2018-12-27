import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  background: ${props => (props.primary ? 'palevioletred' : 'white')};
  color: ${props => (props.primary ? 'white' : 'palevioletred')};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  &:hover {
    background: ${props => (props.primary ? 'palevioletred' : 'white')};
  }
`;

export const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: ${props => (props.selected ? '0 0 0 2px blue;' : 'none')};
`;

export const ToolBarButton = styled.span`
  cursor: pointer;
  color: ${props => (props.reversed ? (props.active ? 'white' : '#aaa') : props.active ? 'black' : '#ccc')};
`;

export const Icon = styled(({ className, ...rest }) => {
  return <span className={`material-icons ${className}`} {...rest} />;
})`
  font-size: 18px;
  vertical-align: text-bottom;
`;

export const Menu = styled.div`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`;

export const Toolbar = styled(Menu)`
  position: relative;
  padding: 1px 18px 17px;
  margin: 0 -20px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  padding: 0.75em;
  margin: 0.75em;
  color: ${props => props.inputColor || 'palevioletred'};
  border: 1px solid;
  border-radius: 3px;
`;
