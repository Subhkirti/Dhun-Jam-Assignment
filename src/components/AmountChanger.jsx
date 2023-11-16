import React from 'react'
import { Box } from '@mui/material';
import classes from "../styles/adminDashboard.module.css";

function AmountChanger({ chargeCustomers, setChargeCustomers, songAmount, amountList, categoryList, setSongAmount }) {

    function handleCustomSongAmount(e, key) {
        chargeCustomers && setSongAmount(songAmount ? { ...songAmount, [key]: Number(e?.target?.value) } : {
            [key]: Number(e?.target?.value)
        });
    }

    return (
        <Box className={classes.gridContainer}>
            <Box className={classes.gridItem}>
                <Box>Do You want to change your customers for requesting songs?</Box>
                <Box>Custom song request amount-</Box>
                <Box>Regular song request amounts from high to low-</Box>
            </Box>
            <Box className={classes.gridItem}>
                <Box
                    display="flex"
                    justifyContent="center"
                    gap={1}
                    alignItems="center"
                >
                    <input
                        className={classes.radioBtn}
                        type="radio"
                        checked={chargeCustomers ? true : false}
                        onChange={() => { setChargeCustomers(!chargeCustomers) }}
                    />
                    Yes
                    <input
                        className={classes.radioBtn}
                        checked={chargeCustomers ? false : true}
                        onChange={() => { setChargeCustomers(!chargeCustomers) }}
                        type="radio"
                    />
                    No
                </Box>

                <input
                    type="text"
                    value={songAmount?.category_6}
                    className={classes.outlinedInputBox}
                    onChange={(e) => handleCustomSongAmount(e, 'category_6')}
                    required={chargeCustomers || false}
                ></input>

                <Box display="flex" justifyContent="space-between">
                    {
                        amountList && amountList.slice(1, amountList.length).map((category, index) => {
                            const categoryKey = categoryList && categoryList[index + 1];
                            return (
                                <input
                                    key={index}
                                    style={{ width: "40px" }}
                                    type="text"
                                    value={songAmount[categoryKey]}
                                    className={classes.outlinedInputBox}
                                    onChange={(e) => handleCustomSongAmount(e, categoryKey)}
                                    required={chargeCustomers || false}
                                ></input>
                            );
                        })}
                </Box>
            </Box>
        </Box>
    )
}

export default AmountChanger