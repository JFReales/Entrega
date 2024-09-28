// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  input {
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.inputText};
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    transition: background-color 0.3s ease, color 0.3s ease;

    &::placeholder {
      color: ${({ theme }) => theme.inputPlaceholder};
    }
  }

  button {
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonText};
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: ${({ theme }) =>
			theme.buttonBackgroundHover || theme.buttonBackground};
    }
  }

 
  .ReactModal__Content {
    background-color: ${({ theme }) => theme.modalBackground}; 
    color: ${({ theme }) => theme.modalText}; 
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease, color 0.3s ease;

    h2, p {
      color: ${({ theme }) => theme.modalText};
    }
  }

  .ReactModal__Overlay {
    background-color: rgba(0, 0, 0, 0.75); 
    transition: background-color 0.3s ease;
  }
`;

export default GlobalStyles;
