import { Backdrop, Box, Button, Container, Fade, Modal, Stack, Typography } from "@mui/material"
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs"
import { useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import Accordion from "../Accordion/Accordion";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import LinearProgressWithLabel from "../LinearProgressWithLabel/LinearProgressWithLabel";
import { useParams, useSearchParams } from "react-router-dom";
import { store } from "../../store/store";
import { observer } from "mobx-react-lite";
import { trackPromise } from "react-promise-tracker";
import { BASE_URL } from "../../constants";
import { colors } from "../../constants/colors";
import { Context } from "../../App";
import { IDocumentList } from "../../types";
import Confetti from 'react-confetti'

const DocsRole: React.FC = () => {
  const { roleId } = useParams();
  const [searchParams] = useSearchParams()
  const modifiedDocumentId = searchParams.get("documentId")
  const { isTablet } = useContext(Context)
  const { document, user } = store;
  const [data, setData] = useState<IDocumentList[]>([]);
  const [roleDetail, setRoleDetail] = useState({ id: "", name: "", pictureUrl: "" })
  const [open, setOpen] = useState(false)
  const [total, setTotal] = useState(0)
  const [reading, setReading] = useState(0)
  const [lastReadDocumentId, setLastReadDocumentId] = useState<string>("")

  const percent = useMemo(() => {
    const total = data.reduce((acc, cur) => acc + (cur?.documents ?? []).filter(Boolean).length, 0)
    const reading = data.reduce((acc, cur) => acc + (cur?.documents ?? []).filter(item => item.read).length, 0)
    setTotal(total);
    setReading(reading);
    return Math.round(reading / total * 100)
  }, [data])

  useLayoutEffect(() => {
    if (roleId) {
      trackPromise(
        document.getList({ roleId })
          .then(() => setData(document.documentList))
          .then(() => user.getRoleDetail(roleId)
            .then((data) => setRoleDetail(data)))
      )
    }
  }, [roleId])
  const links = [
    { title: "Главная", href: "/" },
    { title: roleDetail.name ?? "", href: "/" },
  ]

  const onReadLastDocument = () => {
    if (roleId && lastReadDocumentId) {
      document.checkToRead(lastReadDocumentId, true).then(() => {
        document.getList({ roleId })
          .then(() => setData(document.documentList))
      })
      setOpen(false)
      setLastReadDocumentId("")
    }
  }
  const onRead = (id: string, isRead: boolean) => {
    if (roleId) {
      if (total - reading === 1 && !isRead) {
        setOpen(true)
        setLastReadDocumentId(id)
      }
      else {
        document.checkToRead(id).then(() => {
          document.getList({ roleId })
            .then(() => setData(document.documentList))
        })
      }
    }
  }
  const [showConfetti, setShowConfetti] = useState(false)
  const [initConfetti, setInitConfetti] = useState(false)

  useEffect(() => {
    if (percent === 100) {
      setShowConfetti(true)
      setInitConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
    }
  }, [percent])
  return (<>
    {/* вынести в отдельный компонент */}
    <Container
      sx={{
        padding: isTablet ? "0 !important" : "",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "50rem",
          backgroundImage: `url("${BASE_URL.BASE}${roleDetail.pictureUrl}")`,
          backgroundColor: colors.black50,
          backgroundBlendMode: "multiply",
          borderRadius: isTablet ? "0 0 2.4rem 2.4rem" : "2.4rem",
          justifyContent: "space-between",
          padding: isTablet ? "2rem clamp(2rem, 5vw, 3.2rem)" : 3.2,
          paddingTop: 0,
        }
        }
      >
        <Breadcrumbs links={links} light={true} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h1"
            color={colors.white}
            paddingBottom={"3.2rem"}
            paddingTop={"7rem"}
          >
            Документы для профессии  «{roleDetail.name}»
          </Typography>
          <LinearProgressWithLabel value={percent} />
          {<Confetti
            style={{
              transition: "opacity 11s ease-in-out",
            }}
            tweenDuration={100}
            run={initConfetti}
            recycle={showConfetti}
          // opacity={percent === 100 ? 1 : 0}
          // width={"100%" as unknown as number}
          // height={"100%" as unknown as number}
          />}
        </Box>
      </Box >
    </Container>
    <Container>

      <Box
        // display={"grid"}
        flexDirection={"column"}
        gap={"1.2rem"}
        marginTop={isTablet ? 4 : 6}

        sx={{
          columns: isTablet ? 1 : 2,
          breakInside: "avoid",
          breakBefore: "column",
          breakAfter: "column",
          display: "block",
        }}
      >
        {
          document.documentList && document.documentList?.map((item, index) => (
            <Accordion
              key={index}
              title={item.sectionName}
              details={item.documents ?? []}
              onRead={onRead}
              modifiedDocumentId={modifiedDocumentId}
            />
          ))
        }
      </Box>
    </Container >
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isTablet ? '100%' : 750,
            bgcolor: 'background.paper',
            boxShadow: 24,
            px: isTablet ? 2 : 5,
            py: isTablet ? 2 : 4,
          }}
        >
          <Stack display={'flex'} justifyContent={'space-between'} direction={'row'}>
            <Typography variant='h3' component='h3' paddingBottom={3}>
              Подтвердите завершение чтения документа
            </Typography>
            <CloseSharpIcon onClick={() => setOpen(false)} fontSize='medium' sx={{ cursor: 'pointer' }} />
          </Stack>
          {/* <Box>adwda</Box> */}
          <Stack sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 3
          }}>
            <Button variant='outlined' sx={{ width: '100%', mt: isTablet ? 2 : 3 }} onClick={() => { setOpen(false); setLastReadDocumentId('') }}>
              Отменить
            </Button>
            <Button variant='contained' sx={{ width: '100%', mt: isTablet ? 2 : 3 }} onClick={() => onReadLastDocument()}>
              Подтвердить
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  </>

  )
}
export default observer(DocsRole)