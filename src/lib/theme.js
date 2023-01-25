import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            default: "#323437",
            secondary: "#646669",
            tertiary: "#2c2e31"
        },
        text: {
            primary: "#d1d0c5",
            secondary: "#e2b714",
            tertiary: "#0c0c0c"
        }
    }
});

export { theme };
