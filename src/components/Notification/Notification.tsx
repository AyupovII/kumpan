import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Box, Typography } from '@mui/material';
import { colors } from '../../constants/colors';
import { useEffect, useState } from 'react';
import NotificationContent from '../NotificationContent/NotificationContent';
import { store } from '../../store/store';
import { observer } from 'mobx-react-lite';

interface IProps {
    className?: string;
    value?: number;
    isTablet?: boolean;
}

const Notification: React.FC<IProps> = ({ className, isTablet = false, value = 0 }) => {

    const [openNotification, setOpenNotification] = useState(false);
    const { notification: { notificationList, totalCount, unReadCount } } = store
    useEffect(() => {
        setInterval(() => {
            store.notification.getListNotification({})
        }, 10000)
    }, [])
    return (
        <Box
            className="notification-content"
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                position: 'relative',
            }}
                onClick={() => setOpenNotification(!openNotification)}
            >
                <NotificationsNoneIcon fontSize='large' />
                {Boolean(unReadCount) && <Box sx={{
                    position: 'absolute',
                    borderRadius: '24px',
                    backgroundColor: colors.greenDark,
                    padding: '0.4rem',
                    lineHeight: 0,
                    minWidth: 20,
                    bottom: 9,
                    left: 12,
                    display: "flex",
                    justifyContent: "center",
                    "&:after": {
                        content: '""',
                        borderRadius: "300px",
                        height: "30px",
                        width: "30px",
                        backgroundColor: colors.green,
                        margin: "auto",
                        position: "absolute",
                        animation: "pulsate 3.5s ease-out",
                        animationIterationCount: "infinite",
                        top: 0,
                        bottom: 1,
                        zIndex: -1
                    }
                }}>
                    <Typography variant='subtitle2' color='white'
                        sx={{
                            fontSize: '10px',
                            lineHeight: "normal",
                            userSelect: "none",
                        }}
                    >
                        {unReadCount}
                    </Typography>
                </Box>}
            </Box>
            {openNotification &&
                <NotificationContent
                    openNotification={openNotification}
                    setOpenNotification={setOpenNotification}
                    isTablet={isTablet}
                    notificationList={notificationList ?? []}
                />}
        </Box>

    )
}

export default observer(Notification)