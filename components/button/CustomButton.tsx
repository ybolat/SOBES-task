import {Button} from "@mui/material";
import React from "react";

type Props = {
    text: string;
    handleClick?: () => void;
    startIcon?: React.ReactNode;
}

const CustomButton = ({text, handleClick, startIcon}: Props) => (
    <Button variant="contained" color="primary" onClick={handleClick} startIcon={startIcon}>
        {text}
    </Button>
)

export default CustomButton;
