
import styled from "styled-components";
import { userTheme } from "./globals/userTheme";

export const ItemFormContainer = styled.div`    
    display: flex;
    gap: 20px;
    margin-bottom: 10px;
  `;

  export const Label = styled.label`
    &:first-letter{
      text-transform: uppercase;
    }
  `;

export const Input = styled.input`    
    width: 100%;
    border-radius: 4px;
    padding: 8px 12px;
    outline: none;
    border: 1px solid ${userTheme.containers.borders.gray};
  `;

export const ErrorMessage = styled.p` 
    font-size: 14px;   
    margin-top: -5px;
    margin-bottom: 20px;
    color: ${userTheme.forms.colors.red};
  `;




