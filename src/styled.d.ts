import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
    };
    font: {
      family: {
        main: string;
      };
      size: {
        small: string;
        medium: string;
        large: string;
      };
      weight: {
        light: number;
        regular: number;
        medium: number;
        bold: number;
      };
    };
    spacings: {
      small: string;
      medium: string;
      large: string;
    };
  }
}
