import React from "react";
import { CircularProgress, Box } from "@mui/material";

function Loader() {
    return (
        <Box
            align="center"
            width={1}
            height={1}
            py={2}
            sx={{
                position: "absolute",
                zIndex: "100000",
                display: "flex",
                top: 0,
                justifyContent: "center",
                alignItems: "center",
                left: 0,
            }}
        >
            <CircularProgress style={{ color: "#6741d9" }} />
        </Box>
    );
}
export default Loader

