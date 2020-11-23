import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, Button, Typography, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { valueFields, locationFields } from '../constants/constants';

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#4F4F4F'
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
        alignItems: 'center',
        paddingTop: '30px'
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
    }
}));

export default function SelectBy({ handleChangeRadio, handleChangeSelect, location, value }) {
    const classes = useStyles();

    const displayLocation  = () => {
        return locationFields.map(item => {
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

    return (
        <div className={classes.root}>
            <div className={classes.radioBox}>
                <Typography className={classes.radioLabel} variant="body1">Select a region of the world</Typography>
                <RadioGroup aria-label="location" name="location" value={location} onChange={handleChangeRadio} className={classes.radioGroup}>
                    {displayLocation()}
                </RadioGroup>
            </div>
            <div className={classes.selectBox}>
                <InputLabel id="value" className={classes.label}>Select the type of value example</InputLabel>
                <Select
                labelId="value"
                id="value"
                value={value}
                onChange={handleChangeSelect}
                className={classes.selectGroup}
                autoWidth
                >
                    {displayValueFields()}
                </Select>
            </div>
            <Button className={classes.button} variant="contained" color="primary">
                Search
            </Button>   
      </div>
    )
}
