import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { Card } from '@material-ui/core';
import { valueFields } from '../constants/constants';
import clsx from 'clsx';

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
        height: '40vh',
        margin: 20,
        border: '3px solid #1b014c',
        borderRadius: '30px',
        padding: 20,
        position: 'relative'
    },
    cardsBox: {
        display: 'flex' ,
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        paddingBottom: '2rem'
    },
    contentBox: {
        display: 'flex'
    },
    infoContent: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '50px',
        width: '40%',
        alignItems: 'center'
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
        alignItems: 'flex-end',
        width: '60%',
        minHeight: '35vh',
        maxHeight: '35vh'
    },
    center: {
        justifyContent: 'center',
    },
    link: {
        fontSize: '10px',
        lineHeight: '1',
        color: '#CCBDED',
        bottom: 0
    },
    labelInfo: {
        padding: '0px 10px 10px 10px',
        margin: '10px 10px 15px 0',
        backgroundColor: '#1C014C',
        color: 'white',
        borderRadius: '5px'
    },
    error: {
        display: 'flex',
        alignItems: 'center',
        height: '50vh'
    }
}));

export default function GridBox({ banks, currentPage, setCurrentPage, valueProp }) {
    const classes = useStyles();

    const [ cards, setCards ] = useState([]);

    const showContentInfo = (bank) => {
            const dataName = valueFields.filter(item => item.dataName in bank)[0].dataName;
            return bank && bank[dataName].map(item => {
                return <p>{item.content}</p>
            })
    };

    const infoLabel = (bank) => {
        return valueFields.filter(item => item.dataName in bank)[0].label
    }

    const CardFormat = ({ bank }) => {
       return (
        <>
                <Card className={classes.card}>
                    <div className={classes.contentBox}>
                        <div className={classes.infoContent}>
                            <img className={classes.logo} alt="logo" src={process.env.PUBLIC_URL + `/images/${bank.logo}.png`} />
                            <h5>{bank.stakeholderRegion}</h5>
                            <p>({bank.bankType})</p>
                        </div>
                        <div className={clsx(classes.info)} >
                        <div className={classes.labelInfo}>
                            <p className="sub">{infoLabel(bank)}</p>
                        </div>
                            {showContentInfo(bank)}
                        </div>
                    </div>
                    <a className={classes.link} href={bank.source[0].link} target="_blank" rel="noreferrer">More in source</a>
                </Card>
        </>
    )}

    const createObj = (array, bank, valueName, obj) => {
            const newObj = {};
            newObj.logo = bank.logo;
            newObj.stakeholderRegion = bank.stakeholderRegion;
            newObj.bankType = bank.bankType;
            newObj.source = bank.source;
            newObj[valueName] = obj[valueName];
            array.push(newObj);
    };

    const processBankData = (array, bank) => {
        bank.values && bank.values.forEach(item => {
            if (valueProp === 6) {
                valueFields.forEach(value => {
                    if (value.dataName in item && item[value.dataName].length) createObj(array, bank, value.dataName, item);
                })
            } else if (valueProp === 1) {
                if ('existingPortfolioEnhancement' in item && item['existingPortfolioEnhancement'].length) createObj(array, bank, 'existingPortfolioEnhancement', item);
            } else if (valueProp === 2) {
                if ('newPortfolioExpansion' in item && item['newPortfolioExpansion'].length) createObj(array, bank, 'newPortfolioExpansion', item);
            } else if (valueProp === 3) {
                if ('efficiencyEnhancement' in item && item['efficiencyEnhancement'].length) createObj(array, bank, 'efficiencyEnhancement', item);
            } else if (valueProp === 4) {
                if ('networkOptimisation' in item && item['networkOptimisation'].length) createObj(array, bank, 'networkOptimisation', item);
            } else if (valueProp === 5) {
                if ('enhanceFinancialPerformance' in item && item['enhanceFinancialPerformance'].length) createObj(array, bank, 'enhanceFinancialPerformance', item);
            }
        })
    };
    
    const handlePageClick = (event, value) => {
        setCurrentPage(value);
    }

    const PER_PAGE = 6;
    const offset = (currentPage - 1) * PER_PAGE;
    
    const getCardsObject = () => {
        const dataArray = [];
        banks.forEach((item) => {
            processBankData(dataArray, item)
        })
        setCards(dataArray)
    }

    const pageCount = Math.ceil(cards.length / PER_PAGE);
    
    const showCards = () => {
        if (cards.length) {
            if (cards.length <= 6) {
                return cards.map((item) => {
                    return (
                        <CardFormat bank={item} />
                    )
                });
            } else {
                return cards
                .slice(offset, offset + PER_PAGE)
                .map((item) => {
                    return (
                        <CardFormat bank={item} />
                    )
                });
            }
        } else {
            return (
                <div className={classes.error}>
                    We don't currently have any evidence-based use cases that match your search criteria. Try filtering for "All" to expand your search parameters.
                </div>
            )
        }
    }

    useEffect(() => {
        getCardsObject();
    }, [ banks ])

    return (
        <div className={classes.page}>
            <div className={classes.cardsBox}>
                {showCards()}
                </div>
                {pageCount <= 1 ? '' :
                    <Pagination 
                        page={currentPage}
                        count={pageCount}
                        variant="outlined" color="primary"
                        onChange={handlePageClick}
                    />
                }
        </div>
    )
}
