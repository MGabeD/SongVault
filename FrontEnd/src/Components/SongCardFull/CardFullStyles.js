import { makeStyles } from '@material-ui/core/styles'

// hook called useStyles
const useCardStyles = makeStyles((theme) => ({ // the theme object is part of MUI
    cardGrid: {
        padding: '20px 0'
    },

    card: {
        height: '95%',
        display: 'flex',
        flesxDirection: 'column'
    },

    cardMedia: {
        height: '50%', // images require a specified height to render
        // paddingTop: '56.25%', // aspect ratio of 16:9
    },

    cardContent: {
        flexGrow: 1
    }
}));

export default useCardStyles;