import React, { useEffect, useState } from "react";
import { Box, Button, useMediaQuery, } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  getCurrentUser,
  updatePriceApi,
  userDetailsApi,
} from "../services/authService";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import AmountChanger from "../components/AmountChanger";
import { axisClasses } from '@mui/x-charts';

function AdminDashboard() {
  const [userDetails, setUserDetails] = useState(null);
  const [chargeCustomers, setChargeCustomers] = useState(false)
  const [songAmount, setSongAmount] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();
  const minSongAmount = {
    category_6: 99,
    category_7: 79,
    category_8: 59,
    category_9: 39,
    category_10: 19,
  };

  const user = getCurrentUser();
  const amountList = songAmount && Object.values(songAmount);
  const categoryList = songAmount && Object.keys(songAmount);

  function setDisabled() {
    if (!chargeCustomers || !songAmount) {
      setIsDisabled(true);
      return;
    }
    if (amountList) {
      for (let index = 0; index < amountList.length; index++) {
        const value = amountList[index];
        const categoryKey = categoryList && categoryList[index];

        if (parseInt(value) < minSongAmount[categoryKey]) {
          setIsDisabled(true);
          return;
        }
      }
      setIsDisabled(false);
    } else {
      setIsDisabled(false);
    }
  }

  useEffect(() => {
    async function getUserDetails() {
      try {
        const data = user && (await userDetailsApi(user?.id));
        data && setUserDetails(data);
        data && setSongAmount(data?.amount);
        data?.charge_customers && setChargeCustomers(data?.charge_customers)

      } catch {
        return null;
      }
    }

    const timer = setTimeout(() => {
      !userDetails && getUserDetails();
      if (!user) {
        navigate("/login");
        return null;
      }
    }, 1000);

    setDisabled();
    return () => clearTimeout(timer); // added setTimeOut to stop multi calling of details api

    // eslint-disable-next-line
  }, [userDetails, user, chargeCustomers]);

  async function handleUpdatePrice() {
    const data = await updatePriceApi({ userId: user?.id, songAmount });
    data && setSongAmount(data?.amount);
  }
  const isMobile = useMediaQuery('(max-width:680px)');
  const chartSetting = {
    yAxis: [
      {
        label: '₹',
      },
    ],
    width: isMobile ? 400 : 600,
    height: isMobile ? 400 : 500,
    sx: {
      stroke: "#fff",
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-10px, 0)',
      },
    },
  };

  return userDetails ? (
    <Box className="main-container">
      <p className="heading">
        {userDetails?.name || ""}, {userDetails?.location || ""} on Dhun Jam
      </p>
      <AmountChanger
        chargeCustomers={chargeCustomers}
        setChargeCustomers={setChargeCustomers}
        songAmount={songAmount}
        amountList={amountList}
        categoryList={categoryList}
        setSongAmount={setSongAmount}
      />
      {chargeCustomers && (
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: [
                "Custom",
                "Category 1",
                "Category 2",
                "Category 3",
                "Category 4",
              ],

              scaleType: "band",
            },
          ]}
          colors={["#f0c3f1"]}
          series={[
            {
              data: amountList,
            },
          ]}
          {...chartSetting}
        />
      )}
      <Button
        disabled={isDisabled}
        variant="contained"
        className="submitBtn"
        onClick={handleUpdatePrice}
      >
        Save
      </Button>
    </Box>
  ) : (
    <Loader />
  );
}

export default AdminDashboard;
