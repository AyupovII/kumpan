import { Box, Button, Typography } from "@mui/material"
import { colors } from "../../constants/colors"
import { useEffect } from "react";
import { INotification } from "../../types";
import { useNavigate } from "react-router-dom";
import { store } from "../../store/store";
import { observer } from "mobx-react-lite";
interface IProps {
    openNotification: boolean,
    setOpenNotification: (open: boolean) => void,
    isTablet: boolean,
    notificationList: INotification[]
}
const NotificationContent: React.FC<IProps> = ({ openNotification, setOpenNotification, isTablet, notificationList }) => {
    const navigate = useNavigate();
    const { notification } = store
    const handleClickOutside = (event: MouseEvent) => {
        if (!(event?.target as Element)?.closest('.notification-content')) {
            setOpenNotification(false);
            notification.getListNotification({ limit: 10 })
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const onRead = async (roleId: string, id: string, documentId: string) => {
        await notification.notificationRead([id])
        await notification.getListNotification({})
        navigate(`/role/${roleId}?documentId=${documentId}`)
    }
    const onShowMore = async () => {
        await notification.getListNotification({ limit: notification.limit + 1 })
    }
    return (
        <Box sx={{
            position: 'absolute',
            backgroundColor: 'white',
            width: isTablet ? '100%' : '400px',
            minHeight: '300px',
            top: isTablet ? 74 : 100,
            right: 0,
            borderRadius: "0 0 9px 9px",
            border: `1px solid ${colors.gray100}`,
            zIndex: 5
        }}
        >
            {notificationList?.map((notification) => (
                <Box
                    sx={{
                        padding: '1rem 1.5rem',
                        borderBottom: `1px solid ${colors.gray50}`,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        backgroundColor: notification.read ? colors.white : colors.gray100,
                        '&:hover': {
                            backgroundColor: colors.gray50
                        }
                    }}
                    key={notification.id}
                    onClick={() => onRead(notification.roleId, notification.id, notification.documentId)}
                >
                    <Typography variant="subtitle1">{notification.text}</Typography>
                    <Box borderLeft={`1px solid ${colors.gray50}`} paddingX={1}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ width: "20%" }}>{notification.date.split(" ")[0]}</Typography>
                        <Typography variant="subtitle1" sx={{ width: "20%" }}>{notification.date.split(" ")[1]}</Typography>
                    </Box>
                </Box>
            ))}
            {notification.totalCount > notification.notificationList.length && <Button sx={{ width: '100%' }} onClick={onShowMore}>Показать еще</Button>}
        </Box>
    )
}

export default observer(NotificationContent)