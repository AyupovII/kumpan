import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Box, Container, FormControl, Typography, Stack, Button, useMediaQuery, useTheme, IconButton, InputAdornment, OutlinedInput, FormHelperText } from "@mui/material"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite";
import { store } from "../store/store";
import { ROLES } from "../constants";

const Auth: React.FC = () => {
  const theme = useTheme();
  const isTablet =
    useMediaQuery(theme.breakpoints.down('vp_1024'));
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorAuth, setErrorAuth] = useState('');
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await store.login({ login: email, password }).catch((e) => setErrorAuth("Ошибка авторизации: " + e.message))
    await store.user.getUser()
    await store.user.getRoles()

    const rolesCurrentUser = store.user.roles;
    const isAdmin = Boolean(rolesCurrentUser.find(role => role.id === ROLES.ADMIN))
    if (isAdmin) {
      navigate('/matrix-roles')
    } else {
      navigate('/')

    }
  }
return (
  <Container>
    <Box maxWidth={650}>
      <Typography variant="h2" paddingTop={11.9} paddingBottom={3}>Авторизация</Typography>
      <form onSubmit={handleLogin}>
        <Box display={"flex"} flexDirection={"column"}>
          <FormControl>
            <Stack spacing={isTablet ? 1 : 0.5} paddingBottom={2}>
              <Typography variant="h5">Введите логин*</Typography>
              <OutlinedInput
                id="outlined-adornment-email"
                type={"text"}
                placeholder="Введите Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Stack>
            <FormHelperText />
          </FormControl>
          <FormControl>
            <Stack spacing={isTablet ? 1 : 0.5} paddingBottom={1.5}>
              <Typography variant="h5">Введите пароль*</Typography>

              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Stack>
            <FormHelperText />
          </FormControl>
          <Typography variant="h5" paddingBottom={isTablet ? 3 : 4}>
            <Link to="/recover-password" >Восстановить пароль</Link>
          </Typography>
          <Button type="submit" variant="contained" sx={{ marginTop: "2rem", width: "100%" }} onClick={() => { }}>Войти</Button>
          <Typography variant="subtitle1" color={"error"} paddingTop={1} paddingLeft={1} height={12}>{errorAuth}</Typography>
        </Box>
      </form>
    </Box>
  </Container>
)
}

export default observer(Auth)