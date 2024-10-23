import { Box, Button, Container, Typography, useMediaQuery, useTheme } from "@mui/material"
import Banner from "../components/Banner/Banner"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { store } from "../store/store"
import { observer } from "mobx-react-lite"
import { trackPromise } from "react-promise-tracker"
import { BASE_URL, ROLES } from "../constants"

const Home: React.FC = () => {
  const { user: { roles } } = store
  const theme = useTheme();
  const isTablet =
    useMediaQuery(theme.breakpoints.down('vp_1024'));
  useEffect(() => {
    trackPromise(store.user.getRoles())
  }, [])

  return (
    <>
      <Banner />
      <Container>
        <Box
          display={"grid"}
          gridTemplateColumns={{
            vp_360: "repeat(1, 1fr)",
            vp_1024: "repeat(2, 1fr)",
            vp_1440: "repeat(3, 1fr)"
          }}
          gap={2}
          marginTop={4}>
          {roles.filter((role) => role.id !== ROLES.ADMIN).map((role, index) => (
            <Link to={`/role/${role.id}`}
              key={role.id}
              style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
            >
              <Box
                borderRadius={isTablet ? 2.4 : 5}
                flexGrow={1}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"flex-end"}
                sx={{
                  backgroundImage: `url("${BASE_URL.BASE}${role.pictureUrl}")`,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  backgroundBlendMode: "multiply",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: 314,
                  minWidth: 300,
                }}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  padding={isTablet ? 2 : 3}
                  gap={isTablet ? 1.2 : 3}
                >
                  <Typography
                    color={"white"}
                    variant="subtitle1"
                    sx={isTablet ? { fontSize: 32, fontWeight: 700 } : {}}
                  >
                    {role.name}
                  </Typography>
                  {!isTablet && 
                    <Button variant="outlined" color="secondary">Подробнее</Button>
                  }
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
        <Box display={"flex"} justifyContent={isTablet ? "center" : "end"} marginTop={isTablet ? 4 : 6}>
        </Box>
      </Container>
    </>
  )
}
export default observer(Home)