import { createContext } from 'react'

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export default createContext({
    theme: themes.dark, // значение по умолчанию
    toggleTheme: () => {
        this.theme = {
            foreground: '#bleu',
            background: '#black',
        }
    }
});
