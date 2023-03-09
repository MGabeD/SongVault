import { makeStyles } from '@material-ui/core/styles'
import { BorderColor } from '@material-ui/icons';

// hook called useStyles
const useStyles = makeStyles((theme) => ({ // the theme object is part of MUI
    container: {
        height: '45px',
        width: '100%',
        background: 'black',
        color: 'white',
        border: '1px',
        display: 'flex',
        flexDirection: 'row',
    },
    songTitle: {
        display: 'flex',
        alignItems: 'center',
        width: '27%',
        whiteSpace: 'nowrap',
        overflow: 'scroll',
        marginRight: '5px',
    },
    artistName: {
        display: 'flex',
        width: '15%',
        whiteSpace: 'nowrap',
        overflow: 'scroll',
        marginRight: '10px',
    }

}));

export default useStyles;