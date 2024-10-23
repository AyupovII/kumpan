import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ReactComponent as AlignJustify } from '../../assets/svg/align-justify.svg';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import logo from '../../assets/logo.svg';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, Link as LinkMui, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { store } from '../../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../App';
import { colors } from '../../constants/colors';
import Notification from '../Notification/Notification';

interface IProps {
  className?: string;
}

const Header: React.FC<IProps> = ({ className }) => {

  const { setHiddenScroll, isTablet } = useContext(Context)
  const { user, isAuth, notification } = store;
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);


  const fullNameDesktop = `${user.data?.name} ${user.data?.lastName}`
  const fullNameTablet = `${user.data?.name}`
  const fullName = user.data.id ? (isTablet ? fullNameTablet : fullNameDesktop) : ""

  useLayoutEffect(() => {
    if (isAuth) {
      user.getUser()
      notification.getListNotification({})
    }
  }, [])
  const handleLogout = async () => {
    await store.logout()
    setOpenMenu(false)
    navigate('/auth')
  }
  useEffect(() => {
    setOpenMenu(false)
    setHiddenScroll(false)
  }, [isTablet])

  const openMenuHandler = (isOpen: boolean) => {
    setOpenMenu(isOpen)
    setHiddenScroll(isOpen)
  }
  return (
    <>
      <Box borderBottom={`1px solid ${colors.gray20}`} position={"relative"} >
        {!isTablet ?
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "1.7rem",
              paddingBottom: "1.7rem",
            }}>
            <Box display={"flex"} gap={"4rem"} flexDirection={"row"} alignItems={"center"}>
              <Link to="/">
                <Box component={"img"} src={logo} alt="logo"
                  sx={{
                    width: 222,
                    height: 66,
                  }}
                />
              </Link>
              {isAuth &&
                <>
                  {user.isAdmin
                    ?
                    <Link to="/matrix-roles" color={"inherit"} style={{ textDecoration: "none", color: "inherit" }} onClick={() => setOpenMenu(false)}>
                      <Typography variant='body2' color={colors.black} sx={{ "&:hover": { textDecoration: "underline" } }}>Открыть матрицу ролей</Typography>
                    </Link>
                    :
                    <Link to="/" color={"inherit"} style={{ textDecoration: "none", color: "inherit" }}>
                      <Typography variant='body2' color={colors.black} sx={{ "&:hover": { textDecoration: "underline" } }}>Личный кабинет сотрудника</Typography>
                    </Link>
                  }
                </>
              }
              <Typography variant='body2' color={"#228C0E"}>
                <LinkMui href="https://kumpan.ru/" underline="hover" color={"inherit"} target="_blank">Перейти на сайт Kumpan</LinkMui>
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "2rem", alignItems: "center", fontSize: "1.8rem" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PersonOutlineIcon fontSize='large' />
                <Typography variant='subtitle1' fontWeight={"bold"}>{fullName}</Typography>
              </Box>
              {isAuth && <>
                <Notification />
                <Button color='inherit' onClick={handleLogout}>
                  Выйти
                </Button>
              </>

              }
            </Box>
          </Container >
          :
          <Container
            sx={{
              alignItems: "center",
              paddingTop: "2.2rem",
              paddingBottom: "2.2rem",
            }}>
            <Box display={"flex"} gap={"2rem"} justifyContent={"space-between"}>
              <Box display={"flex"} gap={"2rem"} flexDirection={"row"} alignItems={"center"}>
                <Link to="/">
                  <Box component={"img"} src={logo} alt="logo"
                    sx={{
                      width: 107,
                      height: 30
                    }} />
                </Link>
              </Box>
              <Box
                sx={{ display: "flex", gap: "2rem", alignItems: "center", fontSize: "1.8rem", cursor: "pointer", "&:hover": { "& svg": { color: `black !important` } } }}

              >
                <Notification isTablet />
                <Box onClick={() => openMenuHandler(true)} height={"100%"}>
                  <AlignJustify fontSize='large' color={colors.black} />
                </Box>
              </Box>
            </Box>

          </Container >
        }
      </Box >
      {openMenu &&
        <Box sx={{
          position: "absolute",
          left: openMenu ? 0 : "100%",
          transition: "0.3s ease-in-out",
          top: 0,
          bottom: 0,
          width: "100%",
          backgroundColor: colors.white,
          zIndex: 10,
          opacity: openMenu ? 1 : 0,
        }}>
          <Box display={"flex"} borderBottom={`1px solid ${colors.gray10}`}>
            <Container>
              <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                paddingTop: "2.2rem",
                paddingBottom: "2.2rem",
              }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PersonOutlineIcon fontSize='large' />
                  <Typography variant='subtitle1' fontWeight={"bold"}>{fullName}</Typography>
                </Box>
                <CloseSharpIcon onClick={() => openMenuHandler(false)} fontSize='large' cursor={"pointer"} />
              </Box>
            </Container>
          </Box>
          <Box>
            <Container>
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginTop: 3,
              }}>
                {isAuth &&
                  <>
                    {user.isAdmin
                      ?
                      <Link to="/matrix-roles" color={"inherit"} style={{ textDecoration: "none", color: "inherit" }} onClick={() => setOpenMenu(false)}>
                        <Typography variant='body2' color={colors.black} sx={{ "&:hover": { textDecoration: "underline" } }}>Открыть матрицу ролей</Typography>
                      </Link>
                      :
                      <Link to="/" color={"inherit"} style={{ textDecoration: "none", color: "inherit" }} onClick={() => setOpenMenu(false)}>
                        <Typography variant='body2' color={colors.black} sx={{ "&:hover": { textDecoration: "underline" } }}>Личный кабинет сотрудника</Typography>
                      </Link>
                    }
                  </>
                }
                <Typography variant='body2' color={colors.greenDark}>
                  <LinkMui href="https://kumpan.ru/" underline="hover" color={"inherit"} target="_blank">Перейти на сайт Kumpan</LinkMui>
                </Typography>
                {isAuth && <Typography variant='body2'>
                  <LinkMui onClick={handleLogout} underline="hover" color={"inherit"} sx={{ cursor: "pointer" }}>Выйти</LinkMui>
                </Typography>}
              </Box>

            </Container>
          </Box>
        </Box>
      }
    </>
  );
};

export default observer(Header);