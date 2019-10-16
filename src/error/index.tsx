import styled from 'styled-components'
import React from 'react'

const Error = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 30px;
  background: #ee716c;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 30px;
  visibility: visible;
  opacity: 1;
  transition: visibility 0s, opacity 0.1s linear;
  z-index: 10000;
`

const Text = styled.div`
  color: white;
  font-size: 12px;
  font-weight: 700;
`

interface IErrorProps {
  message?: string;
}

export const ErrorComponent: React.FunctionComponent<IErrorProps> = (props: IErrorProps) => {
  if (!props.message) return null

  return (
    <Error>
      <Text>{props.message}</Text>
    </Error>
  )
}