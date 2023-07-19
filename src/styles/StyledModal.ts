
import styled from "styled-components";
import { userTheme } from "./globals/userTheme";

export const Modal = styled.div` 
    position: fixed;  
    display: flex;
    justify-content: center;
    align-items: center; 
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 10;
    background: rgb(21, 19, 19, 0.76);
  `;

export const ModalContainer = styled.div`    
    background-color: white;
    border-radius: 4px;
    width: 100%;
    max-width: 500px;
  `;

export const ModalTilte = styled.h2`    
    border-bottom: 1px solid ${userTheme.containers.borders.gray};
    padding: 25px  15px;
    margin: 0;
  `;

export const ModalBody = styled.p`    
    padding: 25px 15px;
    margin: 0;
    font-weight: 600;
    border-bottom: 1px solid ${userTheme.tables.borders.gray};
  `;

export const ModalFooter = styled.div`    
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin: 10px 0;
    padding: 15px;
  `;


