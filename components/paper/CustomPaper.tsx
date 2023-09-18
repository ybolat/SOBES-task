import { Paper } from "@mui/material";
import {ReactNode} from "react";

const CustomPaper = ({ children }: { children: ReactNode }) => (
    <Paper elevation={3} style={{ margin: "20px", padding: "10px" }}>
        {children}
    </Paper>
);

export default CustomPaper;
