import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        paddingTop: '2rem'
    }
}));
export default function Table() {
    const classes = useStyles();
    return (
        <div>
            <img  className={classes.root} src="images/table.png" alt="table" />
        </div>
    )
}
