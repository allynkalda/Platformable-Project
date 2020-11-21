import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import data from '../data/data'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center'
    },
    box: {
        border: '3px solid #04FDF6',
        width: '200px',
        height: '300px',
        zIndex: '1',
        borderRadius: '20px'
    },
    logo: {
        width: '100px',
        marginBottom: '-30px',
        zIndex: '2'
    },
    info: {
        color: '#200550',
        overflow: 'scroll',
        marginTop: '25px',
        '& p': {
            fontSize: '12px'
        },
        '& li': {
            fontSize: '11px'
        },
        '& h5': {
            margin: '0'
        },
    },
    ul: {
        textAlign: 'left',
        paddingRight: '15px',
        margin: '0'
    },
    link: {
        fontSize: '10px',
        lineHeight: '1',
        display: 'inline-box',
        color: '#CCBDED'
    }
}));

export default function Cards() {
    const classes = useStyles();

    const bank = data[0];

    return (
        <div className={classes.root} >
        <img className={classes.logo} alt="logo" src="/logos/dbs.png" />
        <div className={classes.box}>
            <div className={classes.info} >
                <h5>{bank.Bank}</h5>
                <p>{bank.Country} ({bank.Region})</p>
                <ul className={classes.ul}>
                    <li>{bank.obValueType}</li>
                    <li>{bank.contentSummary}</li>
                </ul>
                <a className={classes.link} href={bank.source}>{bank.source}</a>
            </div>
        </div>
        </div>
    )
}
