import { Box, CardMedia, Container, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { store } from "../store/store";
import { observer } from "mobx-react-lite";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import { title } from "process";
import { trackPromise } from "react-promise-tracker";
import { BASE_URL } from "../constants";

const DynamicPage: React.FC = () => {
  const theme = useTheme();
  const isTablet =
    useMediaQuery(theme.breakpoints.down('vp_1024'));
  const { pageCode } = useParams();
  const { pagesContent: { pageContent } } = store
  const links = [
    { title: "Главная", href: "/" },
    { title: pageContent?.name || "", href: "/" },
  ]
  useEffect(() => {
    pageCode && trackPromise(store.pagesContent.getPageContent({ pageCode }))
  }, [])
  return (
    <Container>
      <Box>
        <Breadcrumbs links={links} />
        {/* <div
        className={styles.content}
          dangerouslySetInnerHTML={{ __html: pageContent?.description || "" }}
        /> */}
        <Box>
          <Typography variant="h2"
            sx={{
              marginBottom: isTablet ? 2 : 4
            }}>
            {pageContent?.name}
          </Typography>
          <Box
            display={"flex"}
            gap={5}
            flexDirection={isTablet ? "column" : "row"}
            justifyContent={isTablet ? "center" : "space-between"}
          >
            <div
              style={{ width: isTablet ? "100%" : "50%" }}
              className={"content"}
              dangerouslySetInnerHTML={{ __html: pageContent?.description || "" }}
            />
            <Box sx={{ width: isTablet ? "100%" : "45%" }}>
              {pageContent.pictureUrl
                ?
                <Box
                  component={"img"}
                  src={`${BASE_URL.BASE}${pageContent.pictureUrl}`}
                  sx={{
                    width: "100%",
                    borderRadius: 2.4,
                    minHeight: "240px",
                  }} />
                :
                pageContent.videoUrl &&
                <CardMedia
                  sx={{
                    height: "fit-content",
                    backgroundImage: `url("${BASE_URL.BASE}${pageContent.pictureUrl}")`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    minWidth: isTablet ? "100%" : "40%",
                    borderRadius: 2.4
                  }}
                  component="video"
                  src={(`${BASE_URL.BASE}${pageContent.videoUrl}`)}
                  controls
                />}
            </Box>
          </Box>
        </Box>

      </Box>
    </Container>
  )
}

export default observer(DynamicPage) 