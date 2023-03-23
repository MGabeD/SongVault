import { makeStyles } from '@material-ui/core/styles'

// hook called useStyles
const useStyles = makeStyles((theme) => ({ // the theme object is part of MUI
    main: {
        background: 'black', // change to black
    },
    container: { // this is where you can define classes for css styling
        backgroundColor: theme.palette.background.paper, // using theme object for styling
        backgroundColor: "#000000",
        padding: theme.spacing(8, 0, 6),
        paddingTop: '1vh'
    },

    icon: {
        marginRight: '20px' // we can also use regular css here
    },

    buttons: {
        marginTop: '40px'
    },
    footer: {
        // background: theme.palette.background.paper,
        background: 'black',
        color: 'gray',
        padding: '50px',
    },

    // These are Styles for HomePage
    homePageBox: {
        width: '100%',
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: "#000000", 
        color: "#FFFFFF"
    },
    gridContainer: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        padding: '50px',
        width: '100%',
        margin: 0,
    },
    title: {
        paddingBottom: '15px',
    },
    subtitle: {
        opacity: '0.4',
        paddingBottom: '30px',
        color: '000000',
        marginLeft: '50px',
        marginRight: '50px',
    }, 
    largeImage: {
        width: '100%',
    },
    textOnPhotoContainer: {
        position: "relative",
        textAlign: "center",
        color: "white",
        width: "100%"
    },
    centeredTextOnPhoto: {
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    buttonGroup: {
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    button: {
        margin: "20px",
        color: "pink",
        // fontSize: "1vw"
    },
    centeredElements: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: "3vh",
    },
    accountNameTitle: {
        alignItems: 'center',
        display: 'flex', 
        flexDirection: 'column',
        marginBottom: '3vh',
        color: 'white'
    },
    accountDescription: {
        alignItems: 'center',
        display: 'flex', 
        flexDirection: 'column',
        marginBottom: '3vh',
        color: 'gray'
    }

}));

export default useStyles;