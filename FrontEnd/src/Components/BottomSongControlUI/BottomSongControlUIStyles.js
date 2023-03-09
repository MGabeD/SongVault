import { makeStyles } from '@material-ui/core/styles'

// hook called useStyles
const useNavbarStyles = makeStyles((theme) => ({ // the theme object is part of MUI
    container: {
        width: '100%',
        height: 151,
        backgroundColor: "whitesmoke",
        flexDirection: 'row',
        display: 'flex',
        marginLeft: 0,

    },
    songImage: {
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    card: {
        width: 200,
        display: "flex",
        backgroundColor: "whitesmoke",
        // boxShadow: "4px 4px 4px gray",
    }
}));

export default useNavbarStyles;