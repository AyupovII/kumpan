import { Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { colors } from '../../constants/colors';
import { useContext } from 'react';
import { Context } from '../../App';

interface IProps {
  className?: string;
}

const Footer: React.FC<IProps> = ({ className }) => {
  const {  isTablet } = useContext(Context)

  return (
    <Box sx={{
      backgroundColor: colors.gray50,
    }}>
      <Container>
        <Box display={"flex"} justifyContent={"space-between"} paddingY={"3.2rem"} flexDirection={isTablet ? "column" : "row"}>
          <Typography variant='subtitle1' sx={{ opacity: 0.7 }}>© 2024 «Kumpan», все права защищены</Typography>
          <Link to={'/policy'}
            style={{
              textDecoration: "none",
              color: "inherit"
            }}
          >
            <Typography variant='subtitle1' display={'none'} sx={{ opacity: 0.7, "&:hover": { textDecoration: "underline" } }} >
              Пользовательское соглашение
            </Typography></Link>
          <Link to={'https://wptt.ru/'}
            style={{
              textDecoration: "none",
              color: "inherit"
            }}
            target='_blank'
          >
            <Typography variant='subtitle1' sx={{ opacity: 0.7, "&:hover": { textDecoration: "underline" } }} >
              Разработка — Вебпространство
            </Typography></Link>
        </Box>
      </Container >
    </Box >
  )
}

export default Footer