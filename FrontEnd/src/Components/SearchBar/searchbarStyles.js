import { makeStyles } from '@material-ui/core/styles'
import { Opacity } from '@material-ui/icons';
import { fontWeight } from '@mui/system';

// hook called useStyles
const useStyles = makeStyles((theme) => ({ // the theme object is part of MUI
    button: {
        maxHeight: '100%',
        maxWidth: ""
    },
    searchBarOnPhotoContainer: {
        position: "relative",
        padding: '0px',
        textAlign: "center",
        color: "white",
        minWidth: "100%",
    },
    searchBarButtonContainer: {
        width: '50%',
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        display: 'flex',
        padding: '10px',
        borderRadius: '10px',
    },
    searchBarInput: {
        backgroundColor: "#dbdbf4",
        borderRadius: '7px',
        width: "100%",
        height: '30px',
        fontFamily: 'Myriad Pro Regular',
        fontStyle: 'nromal',
        fontWeight: 'normal',
        textIndent: '5px',
    },
    searchBarButton: {
        color: 'white'
    },

}));

export default useStyles;