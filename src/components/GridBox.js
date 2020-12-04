import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { Card } from '@material-ui/core';
import { valueFields } from '../constants/constants';

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
    link: {
        fontSize: '10px',
        lineHeight: '1',
        display: 'inline-box',
        color: '#CCBDED'
    },
    page: {
        paddingTop: 40,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    button: {
        margin: '30px',
        minWidth: '200px'
    },
    media: {
        height: 100,
    },
    card: {
        width: '40vw',
        margin: 20,
        border: '5px solid #1b014c',
        borderRadius: '30px'
    },
    cardsBox: {
        display: 'flex' ,
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%'
    },
    contentBox: {
        display: 'flex',
        padding: 20
    },
    infoContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default function GridBox({ banks, currentPage, setCurrentPage, valueProp }) {
    const classes = useStyles();

    const showLabelInfo = () => {
        console.log('lab', valueProp)
        if (valueProp !== 6) {
            return valueFields.filter(item => item.value === valueProp)[0].label;
        }
    };

    const showContentInfo = (bank) => {
        if (valueProp !== 6) {
            const dataName = valueFields.filter(item => item.value === valueProp)[0].dataName;
            console.log('dataName', bank[dataName])
            return bank && bank[dataName].map(item => {
                return (
                    <p>{item.content}</p>
                )
            })
        } else {
            return <p>{bank.contentSummary}</p>
        }
    };

    const CardFormat = ({ bank }) => {
        return (
            <Card className={classes.card}>
                <div className={classes.contentBox}>
                    <div className={classes.infoContent}>
                        <img className={classes.logo} alt="logo" src={process.env.PUBLIC_URL + `/images/${bank.logo}.png`} />
                        <h5>{bank.stakeholderOrgName}</h5>
                        <p>{bank.stakeholderRegion} {bank.bankType}</p>
                    </div>
                    <div className={classes.info} >
                        <p>{showLabelInfo()}</p>
                        {showContentInfo(bank)}
                    </div>
                </div>
                <a className={classes.link} href={bank.source}>More in source</a>
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

    return (
        <div className={classes.page}>
            <div className={classes.cardsBox}>
                {currentPageData()}
                </div>
                {pageCount <= 1 ? '' :
                    <Pagination 
                        page={currentPage}
                        count={pageCount}
                        ariant="outlined" color="primary"
                        onChange={handlePageClick}
                    />
                }
        </div>
    )
}
