import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        margin: '20px'
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
            fontSize: '12px',
            margin: '3px 0px 5px 0px'
        },
        '& li': {
            fontSize: '12px'
        },
        '& h5': {
            margin: '0'
        },
        height: '260px',
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
    },
    page: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

export default function Cards({ banks }) {
    const classes = useStyles();
    console.log('banks', banks)

    const Card = ({ bank }) => {
        return (
            <div className={classes.root} >
            <img className={classes.logo} alt="logo" src="/logos/dbs.png" />
            <div className={classes.box}>
                <div className={classes.info} >
                    <h5>{bank.Bank}</h5>
                    <p>{bank.Country} {bank.region !== 'UK' && `(${bank.region})`}</p>
                    <ul className={classes.ul}>
                        {bank.obValueType && <li>{bank.obValueType}</li>}
                        {bank.contentSummary && <li>{bank.contentSummary}</li>}
                    </ul>
                    <a className={classes.link} href={bank.source}>More on source</a>
                </div>
            </div>
            </div>
        )
    };

    const showCards = () => {
        let chosen;
        if (banks.length && banks.length > 3) {
          chosen = banks.splice(0, 3);
          const cards = chosen && chosen.map(item => <Card bank={item} />);
          return cards;
        } else {
            const cards = banks && banks.map(item => <Card bank={item} />);
            return cards;
        }
    };
    

    return (
        <div className={classes.page}>
            {showCards()}
        </div>
    )
}
