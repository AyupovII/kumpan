import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { colors } from "../constants/colors";
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false; // removes the `xs` breakpoint
        sm: false;
        md: false;
        lg: false;
        xl: false;
        vp_360: true; // adds the `mobile` breakpoint
        vp_768: true;
        vp_1024: true;
        vp_1440: true;
        vp_1920: true;
    }
}
// Create a theme instance.
export let theme = createTheme({

    breakpoints: {
        values: {
            vp_360: 360,
            vp_768: 768,
            vp_1024: 1024,
            vp_1440: 1440,
            vp_1920: 1920
        },
    },
    spacing: 10,
    palette: {

        primary: {
            main: colors.black,
        },
        secondary: {
            main: colors.white,
        },
    },
    typography: {

        fontFamily: "Corbel",
        fontSize: 18,

        h1: {
            fontSize: 'clamp(3rem, 5vw, 7rem)',
            fontFamily: "Zurich",
            fontWeight: "bold",
        },
        h2: {
            fontSize: 'clamp(2.6rem, 4vw, 5rem)',
            fontFamily: "Zurich",
            fontWeight: "bold",
        },
        h3: {
            fontSize: 'clamp(2rem, 3vw, 3rem)',
            fontFamily: "Zurich",
            fontWeight: "bold",
        },
        subtitle1: {
            fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
        },
        subtitle2: {
            fontSize: 'clamp(1.4rem, 2vw, 2.4rem)',
            fontFamily: "Zurich",
        },
        body1: {
            fontSize: 'clamp(1.8rem, 1.5vw, 2.4rem)',
        },
        body2: {
            fontSize: 'clamp(1.6rem, 1vw, 2rem)',
        },

    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: "clamp(2rem, 5vw, 14rem) !important",
                    paddingRight: "clamp(2rem, 5vw, 14rem) !important",
                    // '@media (max-width: 1024px)': {
                    //     paddingLeft: "0 !important",
                    //     paddingRight: "0 !important",
                    // }
                }
            },
            defaultProps: {
                maxWidth: "vp_1920",
            }
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    "& .MuiButtonBase-root.MuiAccordionSummary-root": {
                        backgroundColor: colors.gray10,
                    },

                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    "&:before": {
                        backgroundColor: "transparent !important",
                    },
                    "&MuiPaper-root-MuiAccordion-root.Mui-expanded":{
                        background: "yellow",
                        margin: "0 !important",
                    }
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: "#FFFFFF",
                    textDecoration: "none",
                },

            },
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    right: -14,
                    top: 7,
                    fontSize: "0.66rem",
                    fontWeight: 700,
                    padding: 0,
                    justifyContent: "flex-start",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "50px",
                    minHeight: "40px",
                    height: "fit-content",
                    width: "fit-content",
                    padding: "1rem 2.5rem",
                    fontSize: "clamp(1.4rem, 1.2vw, 1.8rem)",
                    textTransform: "none",

                    '@media (max-width: 768px)': {
                        // width: '100%',
                    }
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "50px",
                    paddingLeft: "2rem",
                    paddingRight: "3rem",
                    paddingBottom: "1rem",
                    paddingTop: "1.1rem",
                    backgroundColor: "#ffffff",
                    '.MuiOutlinedInput-input': {
                        padding: 0,
                    }
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    border: "none",
                    borderRadius: "4px !important",
                    width: "32px",
                    height: "32px",
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#353535",
                    borderRadius: 0,
                },
            },
        },
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    subtitle1: 'p',
                    body1: 'span',
                },
            },
        },
    },
});