import { makeStyles } from '@material-ui/core/styles'

// hook called useStyles
const useNavbarStyles = makeStyles((theme) => ({ // the theme object is part of MUI
    icon: {
        marginRight: '20px' // we can also use regular css here
    },
    
    loginGroup: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end'
    }
}));

export default useNavbarStyles;