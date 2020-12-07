import React from 'react';
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
        width: '100%'
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
        alignItems: 'center',
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
        margin: '10px 0 15px 0',
        backgroundColor: '#1C014C',
        color: 'white',
        borderRadius: '5px'
    }
}));

export default function GridBox({ banks, currentPage, setCurrentPage, valueProp }) {
    const classes = useStyles();

    const showLabelInfo = () => {
        if (valueProp !== 6) {
            return (
                <div className={classes.labelInfo}>
                    <p className="sub">{valueFields.filter(item => item.value === valueProp)[0].label}</p>
                </div>
            )
        }
    };

    const showContentInfo = (bank) => {
        if (valueProp !== 6) {
            const dataName = valueFields.filter(item => item.value === valueProp)[0].dataName;
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
                        <h5>{bank.stakeholderRegion}</h5>
                        <p>({bank.bankType})</p>
                    </div>
                    <div className={clsx(classes.info, valueProp === 6 && classes.center)} >
                        {showLabelInfo()}
                        {showContentInfo(bank)}
                    </div>
                </div>
                <a className={classes.link} href={bank.source[0].link} target="_blank" rel="noreferrer">More in source</a>
            </Card>
        )
    };
    
    const handlePageClick = (event, value) => {
        setCurrentPage(value);
    }

    const PER_PAGE = 6;
    const offset = currentPage * PER_PAGE;
    
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
