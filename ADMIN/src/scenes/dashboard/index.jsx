import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box></Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        width={250}
        
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          height={100}
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="9"
            subtitle="NO OF BOOKS"
            icon={
              <MenuBookIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          height={100}
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="0"
            subtitle="RENTED BOOKS"
            icon={
              <FactCheckIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          height={100}
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="6"
            subtitle="Active Users"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 3 */}
      </Box>
    </Box>
  );
};

export default Dashboard;
