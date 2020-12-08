import './App.css';
import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import SelectBy from './components/SelectBy.js';
import GridBox from './components/GridBox';
import data from './data/newData'
import { makeStyles } from '@material-ui/core/styles';
import Table from './components/Table';

const useStyles = makeStyles((theme) => ({
    root: {
      color: '#200550',
      [theme.breakpoints.up('md')]: {
        padding: '3rem',
      },
    },
    select: {
      flex: 'flex',
      paddingTop: '4rem'
    },
    logoBox: {
      width: '100vw',
      textAlign: 'right'
    },
    logo: {
      width: '260px'
    }
}));

function App() {
  const classes = useStyles();
  const [ location, setLocation ] = useState('all');
  const [ value, setValue ] = useState(6);
  const [ bankType, setBankType ] = useState('all')
  const [ filtered, setFiltered ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);

  const handleChangeLocation = (event) => {
      setLocation(event.target.value);
      setCurrentPage(1);
      filter();
  };

  const handleChangeBank = (event) => {
    setBankType(event.target.value);
    setCurrentPage(1);
    filter();
};

  const handleChangeSelect = (event) => {
      setValue(Number(event.target.value));
      setCurrentPage(1);
      filter();
  };
  
  const filter = () => {
    let filteredData;
   
      switch(location) {
        case 'europe':
          filteredData = data.filter(item => item.stakeholderRegion === 'UK' || item.stakeholderRegion === 'Europe');
          break;
        case 'us':
          filteredData = data.filter(item => item.stakeholderRegion === 'North America');
          break;
        case 'asia':
          filteredData = data.filter(item => item.stakeholderRegion === 'APAC');
          break;
        case 'africa':
          filteredData = data.filter(item => item.stakeholderRegion === 'Africa & Middle East');
          break;
        case 'latinAmerica':
          filteredData = data.filter(item => item.stakeholderRegion === 'Latin America');
          break;
        default:
          filteredData = data;
      };
      switch(bankType) {
        case 'retail':
          filteredData = filteredData.filter(item => item.bankType === 'Retail');
          break;
        case 'neobank':
          filteredData = filteredData.filter(item => item.bankType === 'Neo' || item.bankType === 'Microfinance' || item.bankType === 'Fintech');
          break;
        case 'private':
          filteredData = filteredData.filter(item => item.bankType === 'Commercial' || item.bankType === 'Investment' ||  item.bankType === 'Private');
          break;
        case 'commercial':
          filteredData = filteredData.filter(item => item.bankType === 'Commercial');
          break;
        default:
          filteredData = filteredData;
      };
      switch(value) {
        case 1:
          filteredData = filteredData.filter(item => item.values.some(obj => obj.existingPortfolioEnhancement && obj.existingPortfolioEnhancement.length));
          break;
        case 2:
          filteredData = filteredData.filter(item => item.values.some(obj => obj.newPortfolioExpansion && obj.newPortfolioExpansion.length));
          break;
        case 3:
          filteredData = filteredData.filter(item => item.values.some(obj => obj.efficiencyEnhancement && obj.efficiencyEnhancement.length));
          break;
        case 4:
          filteredData = filteredData.filter(item => item.values.some(obj => obj.networkOptimisation && obj.networkOptimisation.length));
          break;
        case 5:
          filteredData = filteredData.filter(item => item.values.some(obj => obj.enhanceFinancialPerformance && obj.enhanceFinancialPerformance.length));
          break;
        default:
          filteredData = filteredData;
      };
      setFiltered(filteredData);
  };

  useEffect(() => {
    filter();
  }, [ location, value, bankType ])

  return (
    <div className="App">
      <Grid container className={classes.root}>
        <div className={classes.logoBox}>
          <img className={classes.logo} src={process.env.PUBLIC_URL + "/images/platformable.png"} alt="logo"/>
        </div>
        <div className={classes.table}>
          <Table />
        </div>
        <Grid item md={12} align="center">
            <SelectBy
                handleChangeLocation={handleChangeLocation}
                handleChangeSelect={handleChangeSelect}
                handleChangeBank={handleChangeBank}
                location={location}
                valueProp={value}
                bankType={bankType}
            />
        </Grid>
        <Grid item md={12}>
            <GridBox banks={filtered}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              valueProp={value}
            />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
