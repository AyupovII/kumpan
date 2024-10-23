import { Box, Button, Checkbox, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme, Link as LinkMui } from "@mui/material";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import { ReactComponent as Plus } from '../assets/svg/plus.svg';
import { Fragment, useLayoutEffect, useState } from "react";
import DocumentModal from "../components/DocumentModal/DocumentModal";
import { store } from "../store/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import RoleModal from "../components/RoleModal/RoleModal";
import { trackPromise } from "react-promise-tracker";
import { BASE_URL, ROLES } from "../constants";


interface Props {
    className?: string;
}

const RoleMatrix: React.FC<Props> = ({ className }) => {
    const theme = useTheme();
    const isTablet =
        useMediaQuery(theme.breakpoints.down('vp_1024'));
    const [openModalDocument, setOpenModalDocument] = useState(false);
    const [openModalRole, setOpenModalRole] = useState(false);

    const { document, user } = store;

    const links = [
        { title: "Главная", href: "/" },
        { title: "Матрица ролей", href: "/" },
    ]

    const onUpdateRoleDocument = async (id: string, roleId: string) => {
        await document.updateRoleDocument(id, roleId)
        await document.getListMatrix()
    }
    useLayoutEffect(() => {
        trackPromise(document.getListMatrix()
            .then(() => {
                user.getRolesAll()
            })
        )
    }, [])

    return (
        <Container>
            <Breadcrumbs links={links} />
            <Box
                display={"flex"}
                flexDirection={isTablet ? "column" : "row"}
                paddingBottom={3.2}
                gap={3.2}
                alignItems={isTablet ? "baseline" : "flex-end"}
                justifyContent={"space-between"}
            >
                <Typography
                    variant="h1"
                >
                    Матрица ролей
                </Typography>
                <Box display={"flex"} gap={2.1} flexDirection={isTablet ? "column" : "row"} width={isTablet ? "100%" : "fit-content"}>
                    <LinkMui href={`${BASE_URL.BASE}/bitrix/admin/user_admin.php?lang=ru`}>
                        <Button
                            variant="outlined"
                            sx={{ borderRadius: 5, width: isTablet ? "100%" : "auto" }}
                        >
                            Список пользователей
                        </Button>
                    </LinkMui>
                    <Button
                        variant="outlined"
                        sx={{ borderRadius: 5, width: isTablet ? "100%" : "auto" }}
                        startIcon={<Plus />}
                        onClick={() => setOpenModalRole(true)}
                    >
                        Добавить роль
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ borderRadius: 5, width: isTablet ? "100%" : "auto" }}
                        startIcon={<Plus />}
                        onClick={() => setOpenModalDocument(true)}
                    >
                        Добавить документ
                    </Button>
                </Box>
            </Box>
            {/* ///// */}

            <TableContainer component={Paper}
                sx={{
                    boxShadow: "none",
                    maxHeight: 800,
                }}>
                <Table

                    sx={{
                        borderCollapse: "separate",
                        maxWidth: 650,
                        '& th, & td': {
                            borderRight: "1px solid #B9B9B9",
                            // borderBottom: "1px solid #B9B9B9"
                        },
                        '& td:last-child, & th:last-child': { borderRight: "none" },

                    }}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHead sx={{
                        position: "sticky",
                        top: 0,
                        zIndex: 2,
                        backgroundColor: "#FAFAFA",
                        // backgroundColor: "red",
                        boxShadow: "0px 1px 0px 0px #B9B9B9",
                    }}>
                        <TableRow sx={{
                            borderBottom: "1px solid #B9B9B9",
                        }}>
                            <TableCell width={isTablet ? 110 : 256} height={60} sx={{
                                position: "sticky",
                                left: 0,
                                // backgroundColor: "blue",
                                backgroundColor: "#FAFAFA",
                                borderBottom: "none !important",
                                outline: "1px solid #B9B9B9",


                            }}></TableCell>
                            {
                                user.rolesList.filter(role => role.id !== ROLES.ADMIN).map((role, index) => (
                                    <TableCell key={"role_" + role.id} width={isTablet ? 110 : 275} height={60} align="center">
                                        <Typography variant="subtitle2">{role.name}</Typography>

                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {document?.documentListMatrix && document?.documentListMatrix?.map((row) => (
                            <Fragment key={row.sectionId}>
                                <TableRow sx={{ '& td': { borderRight: "1px solid #B9B9B9", borderBottom: "1px solid #B9B9B9", borderTop: "1px solid #B9B9B9" } }} >
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#228C0E",
                                            position: "sticky",
                                            left: 0,
                                            zIndex: 1,
                                            borderRight: "none !important",
                                        }}
                                    >
                                        <Typography variant="subtitle2" color={"secondary"}>{row.sectionName} 1</Typography>
                                    </TableCell>
                                    <TableCell
                                        colSpan={user.rolesList.filter(role => role.id !== ROLES.ADMIN).length}
                                        sx={{
                                            backgroundColor: "#228C0E",
                                        }}
                                    ></TableCell>
                                </TableRow>
                                {row?.documents?.map((doc, index) => (
                                    <TableRow key={doc.id} sx={{ '& td': { borderRight: "1px solid #B9B9B9" } }} >
                                        <TableCell
                                            sx={{
                                                backgroundColor: "#FAFAFA",
                                                position: "sticky",
                                                left: 0,
                                                zIndex: 1,
                                                outline: "1px solid #B9B9B9",
                                                width: isTablet ? 110 : 256,

                                            }}
                                        >
                                            <Link
                                                to={`${BASE_URL.BASE}${doc.url}`}
                                                target="_blank"
                                                style={{ textDecoration: "none" }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: "black",
                                                        "&:hover": {
                                                            textDecoration: "underline"
                                                        }
                                                    }}
                                                    variant="subtitle2">{doc.name}</Typography>
                                            </Link>
                                        </TableCell>
                                        {user.rolesList.filter(role => role.id !== ROLES.ADMIN).map((role, ind) => (
                                            <TableCell
                                                key={doc.id + "_" + role.id}
                                                width={isTablet ? 110 : 256}
                                                height={isTablet ? 54 : 112}
                                                align="center"
                                            >
                                                <Checkbox
                                                    checked={doc?.roleIdList.includes(role.id)}
                                                    size="large"
                                                    color="success"
                                                    onClick={() => onUpdateRoleDocument(doc.id, role.id)}
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </Fragment>
                        ))}
                    </TableBody >
                </Table>
            </TableContainer>
            <DocumentModal open={openModalDocument} setOpen={setOpenModalDocument} isTablet={isTablet} listChapter={document.listChapter ?? []} />
            <RoleModal open={openModalRole} setOpen={setOpenModalRole} isTablet={isTablet} />
        </Container >
    )
}

export default observer(RoleMatrix)