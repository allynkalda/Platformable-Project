import React from 'react';
import { Radio, RadioGroup, FormControlLabel, Button, Typography, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { valueFields, locationFields, bankFields } from '../constants/constants';

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#4F4F4F',
        display: 'flex',
        justifyContent: 'space-around'
    },
    radioGroup: {
        textAlign: 'center',
        width: '23vw'
    },
    radioLabel: {
        padding: '20px'
    },
    radioBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    selectGroup: {
        fontSize: '14px',
        height: '35px',
        paddingLeft: '10px',
        backgroundColor: '#F2F2F2'
    },
    label: {
        padding: '20px',
        color: '#4F4F4F'
    },
    selectBox: {
        paddingTop: '30px'
    },
    button: {
        margin: '30px'
    },
    radio: {
        '&$checked': {
          color: '#707070'
        }
    },
    checked: {
        color: '#707070'
    },
    fieldsBox: {
        display: 'flex',
        alignItems: 'flex-start'
    },
    fieldColumn: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '2rem'
    }
}));

export default function SelectBy({ handleChangeLocation, handleChangeSelect, handleChangeBank, location, valueProp, bankType }) {
    const classes = useStyles();

    const displayFields  = (fieldsArray) => {
        return fieldsArray.map(item => {
            return (
                <FormControlLabel value={item.value} key={item.value} control={<Radio classes={{root: classes.radio, checked: classes.checked}} />} color="secondary" label={item.label} />
            )
        })
    }
    const displayValueFields = () => {
        return valueFields.map(item => {
            return (
                <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
            )
        })
    };

    console.log('selectBy', valueProp)
    const menuAll = <FormControlLabel value={"all"} key={"all"} control={<Radio classes={{root: classes.radio, checked: classes.checked}} />} color="secondary" label={"All"} />

    return (
        <div className={classes.root}>
            <div className={classes.radioBox}>
                <Typography className={classes.radioLabel} variant="body1">Select a region of the world</Typography>
                <RadioGroup aria-label="location" name="location" value={location} onChange={handleChangeLocation} className={classes.radioGroup}>
                    <div className={classes.fieldsBox}>
                        {menuAll}
                        <div className={classes.fieldColumn}>
                            {displayFields(locationFields)}
                        </div>
                    </div>
                </RadioGroup>
            </div>
            <div className={classes.radioBox}>
                <Typography className={classes.radioLabel} variant="body1">Select the type of bank</Typography>
                <RadioGroup aria-label="bank" name="bank" value={bankType} onChange={handleChangeBank} className={classes.radioGroup}>
                    <div className={classes.fieldsBox}>
                        {menuAll}
                        <div className={classes.fieldColumn}>
                            {displayFields(bankFields)}
                        </div>
                    </div>
                </RadioGroup>
            </div>
            <div className={classes.radioBox}>
                <Typography className={classes.radioLabel} variant="body1">Select the type of value example</Typography>
                <RadioGroup aria-label="value" name="value" value={valueProp} onChange={handleChangeSelect} className={classes.radioGroup}>
                    <div className={classes.fieldsBox}>
                        <FormControlLabel value={6} key={"all"} control={<Radio classes={{root: classes.radio, checked: classes.checked}} />} color="secondary" label={"All"} />
                        <div className={classes.fieldColumn}>
                            {displayFields(valueFields)}
                        </div>
                    </div>
                </RadioGroup>
            </div> 
      </div>
    )
}
