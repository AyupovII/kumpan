import { Box, Button, Container, Typography, useMediaQuery, useTheme } from "@mui/material"
import notFoundIcon from "../assets/404.png"
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isTablet =
    useMediaQuery(theme.breakpoints.down('vp_1024'));
  return (
    <Container>
      <Box
        mt={isTablet ? 5 : 7}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}>
        <Box
          component={"img"}
          src={notFoundIcon}
        />
        <Typography
          variant="h3"
          mt={isTablet ? 1 : 3}
          textAlign={"center"}
        >
          Страница не найдена...
        </Typography>
        <Typography
          variant="subtitle2"
          textAlign={"center"}
          mt={1}
        >
          К сожалению, запрашиваемая вами страница не найдена
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            mt: isTablet ? 4 : 5
          }}
          fullWidth
        >
          Вернуться на главную
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound