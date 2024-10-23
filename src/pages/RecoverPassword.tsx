import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Box, Button, Container, FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { trackPromise } from "react-promise-tracker";
import { store } from "../store/store";


interface Props {
  className?: string;
}
type ValueType = Record<string, string> & {
  email: string;
  password: string;
};
const RecoverPassword: React.FC<Props> = ({ className }) => {
  const theme = useTheme();
  const [value, setValue] = useState<ValueType>({ email: '', password: '' });
  const isTablet =
    useMediaQuery(theme.breakpoints.down('vp_1024'));
  const [step, setStep] = useState(0);

  const textInfo = [
    "Введите почту, с которой вы регистрировались. На нее придет ссылка для восстановления доступа к аккаунту.",
    "Перейдите по ссылке на который мы отправили на почту: ex****@gmail.com",
    "Задайте новый пароль"
  ]
  const ButtonText = [
    "Продолжить",
    "Повторить отправку",
    "Отправить"
  ]
  // переход по ссылке
  const [searchParams] = useSearchParams()
  const userCheckword = searchParams.get("USER_CHECKWORD")
  const userId = searchParams.get("USER_ID")
  //
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", newPassword: "" })
  const [errorMessage, setErrorMessage] = useState("")

  const { auth } = store;
  const navigate = useNavigate();
  const onValidate = (value: string, type: string) => {
    switch (type) {
      case "email":
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) && step === 0) {
          setErrors((oldErrors) => ({ ...oldErrors, email: "Некорректная почта" }))
        }
        else if (!value && step === 0) setErrors((oldErrors) => ({ ...oldErrors, email: "Поле обязательно для заполнения" }))
        else setErrors((oldErrors) => ({ ...oldErrors, email: "" }))
        setValue((oldValue) => ({ ...oldValue, email: value }))
        break
      case "newPassword":
        if (!(value.length >= 6)) {
          setErrors((oldErrors) => ({ ...oldErrors, newPassword: "Пароль должен содержать не менее 6 символов" }))
        }
        else setErrors((oldErrors) => ({ ...oldErrors, newPassword: "" }))
        setValue((oldValue) => ({ ...oldValue, newPassword: value }))
        break
      case "password":
        setValue((oldValue) => ({ ...oldValue, password: value }))
        break
      default:
        break
    }
  }
  const onNextStep = () => {
    for (const key in value) {
      onValidate(value[key], key)
    }
    switch (step) {
      case 0:
        if (!errors.email && value.email) {
          auth.recoveryPasswordStep1(value.email)
            .then(() => {
              setStep(step + 1)
              setErrorMessage("")
            })
            .catch((e) => setErrorMessage(e?.response?.data?.message ?? "Что-то пошло не так"))
        }
        break
      case 1:
        /// шаг -> повторите отправку
        auth.recoveryPasswordStep1(value.email)
        break
      case 2:
        if (userId && userCheckword) {
          if (value.password === value.newPassword) {
            auth.recoveryPasswordStep3(userId, userCheckword, value.password).then(() => navigate("/auth"))
            setErrorMessage("")
          }
          else setErrorMessage("Пароли не совпадают")
        }
        break
    }
  }

  useLayoutEffect(() => {
    if (userCheckword && userId) {
      trackPromise(auth.recoveryPasswordStep2(userId, userCheckword).then(() => setStep(2)).catch(() => setStep(0)))
    }
  }, [])

  return (
    <Container>
      <Link to="/auth">
        <Box sx={{
          display: "flex",
          gap: 1,
          marginTop: isTablet ? "5rem" : "9.4rem",
          marginBottom: isTablet ? "2rem" : "3rem"
        }}>
          <ChevronLeft fontSize={"large"} />
          <Typography variant="h5">
            Вернуться
          </Typography>
        </Box>

      </Link>
      <Box maxWidth={650}>
        <Typography variant="h2" paddingBottom={3}>Восстановление пароля</Typography>
        <Box >
          <Typography variant="subtitle1" paddingBottom={2}>
            {textInfo[step]}
          </Typography>
          {step === 0 &&
            <FormControl fullWidth>
              <Stack spacing={isTablet ? 1 : 0.5} paddingBottom={0.5}>
                <Typography variant="h5">Электронная почта*</Typography>
                <OutlinedInput
                  error={Boolean(errors.email)}
                  id="outlined-adornment-email"
                  type={"email"}
                  placeholder="example@gmail.com"
                  value={value.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onValidate(e.target.value, "email")}
                  required
                />
              </Stack>
              <FormHelperText
                error
                component={'div'}
              >
                <Typography variant="subtitle1" color={"error"} paddingBottom={1}>{errors.email}</Typography>
              </FormHelperText>
            </FormControl>
          }
          {step === 1 &&
            <FormControl fullWidth>
              <Stack spacing={isTablet ? 1 : 0.5} paddingBottom={0.5}>
                {/* <Typography variant="h5">Введите пароль*</Typography> */}
                {/* <InputMask
                  mask="99 - 99"
                  placeholder="__ - __"
                >
                  <TextField
                    required
                    placeholder="__ - __"
                  />
                </InputMask> */}
              </Stack>
              <FormHelperText />
            </FormControl>
          }
          {step === 2 && <>
            <FormControl fullWidth>
              <Stack spacing={isTablet ? 1 : 0.5} paddingBottom={0.5}>
                <Typography variant="h5">Придумайте новый пароль*</Typography>
                <OutlinedInput
                  type={showNewPassword ? 'text' : 'password'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onValidate(e.target.value, "newPassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setNewShowPassword(!showNewPassword)}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }

                />
              </Stack>
              <FormHelperText component={'div'}>
                <Typography variant="subtitle1" color={"error"} paddingBottom={1}>{errors.newPassword}</Typography>
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <Stack spacing={isTablet ? 1 : 0.5} paddingBottom={1.5}>
                <Typography variant="h5">Повторите пароль*</Typography>

                <OutlinedInput
                  error={Boolean(errors.password)}
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onValidate(e.target.value, "password")}
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
              <FormHelperText component={'div'}>
                <Typography variant="subtitle1" color={"error"} paddingBottom={1}>{errors.password}</Typography>
              </FormHelperText>
            </FormControl>
          </>
          }
          <Button variant="contained" sx={{ width: "100%" }} onClick={() => { onNextStep() }}> {ButtonText[step]}</Button>
          <Typography variant="subtitle1" color={"error"} paddingTop={1} paddingLeft={1} height={12}>{errorMessage}</Typography>

        </Box>

      </Box>
    </Container>
  )
}

export default RecoverPassword