import { Box, Container, Typography } from "@mui/material"
import preloaderLoaded from "../../assets/svg/preloader_loaded.svg"
import preloader from "../../assets/svg/preloader.svg"
import { useEffect, useState } from "react"

const Loading: React.FC = () => {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(prev => prev + 1)
    }, 5)
    if (tick >= 100) clearInterval(interval)
    return () => clearInterval(interval)
  })

  return (
    <Container sx={{
      height: "100dvh",
      display: "flex",
      justifyContent: "center"
    }}>
      <Box
        sx={{
          display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"
        }}
      >
        <Box sx={{
          width: 125,
          height: 159,
          position: "relative",
        }}>
          <Box
            component={"img"}
            src={preloader}
            loading="eager"
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
          <Box
            component={"img"}
            src={preloaderLoaded}
            loading="eager"
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              clipPath: `inset(${100 - tick}% 0 0 0)`
            }}
          />
        </Box>
        <Typography
          variant="h3"
          color={"primary"}
          textAlign={"center"}
          fontSize={"3rem"}
          mt={1}
        >
          {tick}%
        </Typography>
      </Box>


    </Container >
  )

}

export default Loading