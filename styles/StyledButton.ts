import styled from "styled-components";
import { userTheme } from "./globals/userTheme";

interface IButton {
  backgroundcolor?: 'white' | 'gray' | 'yellow' | 'red' | 'green' | 'blue';
  color?: 'red' | 'white';
  bordercolor?: 'white' | 'gray' | 'yellow' | 'red' | 'green' | 'blue';
  props?: any;
}

interface IButtonsContainer {
  margintop?: number;
}

export const Button = styled.button<IButton>`    
    font-size: 14px;
    font-weight: 600;
    padding: 6px 16px;
    cursor: pointer;
    border: 1.5px solid;
    border-radius: 4px;
    background-color:${({ backgroundcolor= userTheme.buttons.backgrounds.gray }) => 
    backgroundcolor};
    border-color: ${({ bordercolor, backgroundcolor }) => (bordercolor || backgroundcolor)};
    color: ${({ color= 'white' }) => (color)};
  `;

export const ButtonsContainer = styled.div<IButtonsContainer>`    
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin: ${({ margintop }) => (margintop || 10)+'px'} 0 10px 0;
  `;

