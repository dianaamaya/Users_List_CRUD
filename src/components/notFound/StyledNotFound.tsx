import styled from 'styled-components'
import { userTheme } from '@/styles/globals/userTheme'

export const Container = styled.div`
  max-width: 600px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -80%);
  border-radius: 4px;
  text-align: center;
`

export const Span = styled.span`
  background: ${userTheme.buttons.backgrounds.green};
  border-color: ${userTheme.buttons.backgrounds.green};
  color: ${userTheme.buttons.colors.white};
  font-size: 16px;
  font-weight: 600;
  padding: 6px 16px;
  cursor: pointer;
  border: 1.5px solid;
  border-radius: 4px;
  margin-top: 20px;
`
