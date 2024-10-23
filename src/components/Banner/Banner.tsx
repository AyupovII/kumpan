import React, { useContext, useEffect } from 'react';
import lk_background from '../../assets/lk-background.png';
import { Box, Button, Container, Typography } from '@mui/material';
import { store } from '../../store/store';
import { Link } from 'react-router-dom';
import { colors } from '../../constants/colors';
import { Context } from '../../App';

interface IProps {
  className?: string;
}

const Banner: React.FC<IProps> = ({ className }) => {
  const {  isTablet } = useContext(Context)
  const { pagesContent, user } = store
  useEffect(() => {
    store.pagesContent.getPages()
  }, [])
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.black50,
        backgroundImage: `url(${lk_background})`,
        backgroundBlendMode: "multiply",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        // height: isTablet ? "52.6rem" : "55.3rem",
      }}
    >
      <Container>
        <Box paddingTop={'clamp(6rem, 10vw,  11.7rem)'} paddingBottom={'12rem'}>
          <Typography variant="h1" color={colors.white} paddingBottom={"clamp(2rem, 5vw, 3rem)"}>
            Личный кабинет<br />{user.isAdmin ? "администратора" : "сотрудника"}
          </Typography>
          <Typography variant="h3" color={colors.white} paddingBottom={"clamp(2rem, 5vw, 3rem)"}>
          Правила и инструкции для сотрудников компании Kumpan
          </Typography>
          <Box display={'flex'} gap={'2rem'} flexWrap={'wrap'} flexDirection={{ xs: "column", md: "row" }}>
            {
              pagesContent.listPages.map((page, index) => (

                <Link to={`/content/page/${page.code}`} key={page.code} style={isTablet ? { width: "100%" } : {}}>
                  <Button
                    color='secondary'
                    sx={isTablet ? { width: "100%" } : {}}
                    variant='outlined'
                  >
                    {page.name}
                  </Button>
                </Link>
              ))
            }
          </Box>
        </Box>
      </Container>
    </Box >
  );
};

export default Banner;