import styled from "styled-components";
import { userTheme } from "@/styles/globals/userTheme";

interface IWrapper {
  maxwidth?: number
}

interface IContainerr {
  padding?: number
}

export const HeaderContainer = styled.header`    
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${userTheme.containers.borders.gray};
    margin-bottom: 5px;
    padding: 5px  15px;
  `;

export const MainContainer = styled.main`    
    padding: 15px;
  `;

export const Wrapper = styled.div<IWrapper>`
    max-width: ${({maxwidth}) => maxwidth ? (maxwidth) + 'px' : 'fit-content'};    
    margin-left: auto;    
    margin-right: auto;    
    border-radius: 4px;
    -webkit-box-shadow: -1px 0px 21px -12px rgba(110, 105, 105, 1);
    -moz-box-shadow: -1px 0px 21px -12px rgba(110, 105, 105, 1);
    box-shadow: -1px 0px 21px -12px rgba(110, 105, 105, 1);
  `;

  export const Container = styled.div<IContainerr>`
    padding: ${({padding}) => (padding || 20) + 'px'};
  `

