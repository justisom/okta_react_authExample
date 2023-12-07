// Anim Tech Style sheet
import { createTheme } from "@mui/material/styles";
import { grey, blue } from '@mui/material/colors';

// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ClearIcon from "@mui/icons-material/Clear";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from "@mui/icons-material/Search";


// Colors for themes
const warningMain = '#ED8C3A';
const errorMain = '#EF5350';
const successMain = '#8DB2CF';
const infoMain = '#0288D1';

const titleMain = '#ED8C3A';
const titleLight = '#AAC1D3';

const lightPrimaryMain = '#F6FBFF';
const lightPrimaryContent = '#D5E5F0';
const lightPrimaryContentHover = '#EEF6FB';
const lightPrimaryContentFocus = '#A6B8C3';
const lightPrimaryContentAlt = '#CED9E1';
const lightSecondaryMain = '#E2EBF0';
const lightSecondaryLight = '#EDF5FC';
const lightSecondaryContent = '#EDF0F6';
const lightSecondaryContentAlt = '#B7C1C9';

const lightPrimaryLight = '#FBFDFF';    // #F4F9FD
const lightLoginMain = '#FFEEDB';
const lightLoginLight = '#DFD0BD';
const lightContrastText = '#313D45';
const lightBoldMain = '#87c9ed';

const lightBoxPrimaryMain = '#bcc8d1';
const lightBoxPrimaryLight = '#9faab4'

const darkPrimaryMain = '#4B5B67';
const darkPrimaryLight = '#738C9D';
const darkSecondaryMain = '#80776E';
const darkContrastText = '#E2EBF0';
const darkBoldMain = '#ED8C3A';


// ============================================================================
// ===== Light ================================================================
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: lightPrimaryMain,
            light: lightPrimaryLight,
            content: lightPrimaryContent,
            contentHover: lightPrimaryContentHover,
            contentFocus: lightPrimaryContentFocus,
            contentAlt: lightPrimaryContentAlt,
            contrastText: lightContrastText,
            loginMain: lightLoginMain,
            loginLight: lightLoginLight,
        },
        secondary: {
            main: lightSecondaryMain,
            light: lightSecondaryLight,
            content: lightSecondaryContent,
            contentAlt: lightSecondaryContentAlt,
            contrastText: lightContrastText,
        },
        warning: {
            main: warningMain,
        },
        error: {
            main: errorMain
        },
        success: {
            main: successMain
        },
        info: {
            main: infoMain
        },
        title: {
            main: titleMain,
            light: titleLight
        },
        dropdown: {
            main: grey['500'],
        },
        icon: {
            on: successMain,
            off: infoMain
        }
    },
    spacing: 4,
    components: {
        MuiTypography: {
            defaultProps: {
                className: 'prevent-select'
            },
            styleOverrides: {
                root: {                    
                    color: lightContrastText
                }
            },
        },

        MuiBox: {
            defaultProps: {
                backgroundColor: lightSecondaryMain,
            }
        },

        // Button Components
        MuiButton: {
            variants: [
                {
                    props: { variant: 'example-a' },
                    style: {
                    textTransform: 'none',
                    border: '2px dashed blue',
                    },
                },
                {
                    props: { variant: 'example-b', color: 'secondary' },
                    style: {
                    border: '4px dashed red',
                    },
                },
            ],
            styleOverrides: {
                root: {
                    color: lightContrastText,
                    backgroundColor: lightBoldMain,
                }
            }
        },

        // Checkboxes
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    '&.Mui-checked': {
                        color: successMain
                    }
                }
            }
        },

        // Select Menu
        MuiSelect: {
            styleOverrides: {
                root: {
                    minWidth: 10,
                }
            }
        },

        MuiFormControl: {
            styleOverrides: {
                root: {
                    backgroundColor: lightPrimaryLight
                }
            }
        }
    },
    ItemButton: {
        default: {
            backgroundColor: '#F5F6FA',
            border: "1px solid",
            borderColor: grey['300']
          },
          hover: {
            backgroundColor: '#f6f7fb',
            borderColor: blue['200']
          },
          focus: {
            backgroundColor: '#E8ECF5',
            borderColor: grey['500'],
            boxShadow: 2,
            "&:hover": null
          }
    },
    Icons: {
        timeIcon: AccessTimeIcon,
        filterIcon: FilterAltOutlinedIcon,
        searchIcon: SearchIcon,
        sortIcon: SortIcon,
        clearIcon: ClearIcon,
    }
});

// ============================================================================
// ===== Dark =================================================================not
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: darkPrimaryMain,
            light: darkPrimaryLight,
            contrastText: darkContrastText,
        },
        secondary: {
            main: darkSecondaryMain,
            contrastText: darkContrastText,
        },
        warning: {
            main: warningMain
        },
        // error: {
        //     main: errorMain
        // },
        success: {
            main: successMain
        },
        info: {
            main: infoMain
        }

    },
    spacing: 4,
    components: {

        MuiTypography: {
            styleOverrides: {
                root: {
                    color: darkContrastText
                }
            }
        },

        MuiBox: {
            defaultProps: {
                backgroundColor: darkSecondaryMain,
            }
        },

        // Button Components
        MuiButton: {
            styleOverrides: {
                root: {
                    color: darkContrastText,
                    backgroundColor: darkBoldMain,
                }
            }
        },

        // Checkboxes
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    '&.Mui-checked': {
                        color: successMain
                    }
                }
            }
        },

        // Select Menu
        MuiSelect: {
            styleOverrides: {
                root: {
                    minWidth: 10,
                }
            }
        },

        MuiFormControl: {
            styleOverrides: {
                root: {
                    backgroundColor: darkPrimaryLight
                }
            }
        }
    }
});