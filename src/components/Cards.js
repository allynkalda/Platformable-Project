import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { Card } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        margin: '20px'
    },
    logo: {
        width: '100px',
        margin: '10px'
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
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    button: {
        margin: '30px',
        minWidth: '200px'
    },
    media: {
        height: 100,
    },
    card: {
        maxWidth: 240,
        margin: 20,
        border: '5px solid #1b014c',
        borderRadius: '30px'
    },
    info: {
        color: '#200550',
        overflow: 'scroll',
        marginBottom: '25px',
        '& p': {
            fontSize: '12px',
        },
        '& li': {
            fontSize: '12px'
        },
        '& h5': {
            fontSize: '14px',
            margin: '5px'
        },
        height: '260px',
    },
}));

export default function Cards({ banks, currentPage, setCurrentPage }) {
    const classes = useStyles();
    const CardFormat = ({ bank }) => {
        return (
            <Card className={classes.card}>
                <img className={classes.logo} alt="logo" src="logos/dbs.png" />
                <div className={classes.info} >
                    <h5>{bank.Bank}</h5>
                    <p>{bank.Country} {bank.region !== 'UK' && `(${bank.region})`}</p>
                    <ul className={classes.ul}>
                        {bank.obValueType && <li>{bank.obValueType}</li>}
                        {bank.contentSummary && <li>{bank.contentSummary}</li>}
                    </ul>
                    <a className={classes.link} href={bank.source}>More in source</a>
                </div>
            </Card>
        )
    };
    
    const handlePageClick = (event, value) => {
        setCurrentPage(value);
    }

    const PER_PAGE = 6;
    const offset = currentPage * PER_PAGE;
    console.log('jsjs', banks
        .slice(offset, offset + PER_PAGE))
    
    const currentPageData = () => {
        if (banks.length <= 6) {
            return banks.map((item) => {
                return (
                    <CardFormat bank={item} />
                )
            });
        } else {
            return banks
            .slice(offset, offset + PER_PAGE)
            .map((item) => {
                return (
                    <CardFormat bank={item} />
                )
            });
        }
    }

    const pageCount = Math.floor(banks.length / PER_PAGE);
    console.log('banks', banks)
    console.log('pageCount', pageCount)

    const showCards = () => {

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{ display: 'flex' , flexWrap: 'wrap', justifyContent: 'center'}}>
                    {currentPageData()}
                </div>
                {pageCount <= 1 ? '' :
                    <Pagination 
                        page={currentPage}
                        count={pageCount}
                        ariant="outlined" color="primary"
                        onChange={handlePageClick} />
                }
            </div>
        )
    };
    
    

    return (
        <div className={classes.page}>
            {showCards()}
        </div>
    )
}
