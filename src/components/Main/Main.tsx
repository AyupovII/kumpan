import { Box } from '@mui/material';
import { useContext } from 'react';
import { Context } from '../../App';

interface IProps {
  sx?: object;
  children?: React.ReactNode;
}

const Main: React.FC<IProps> = ({ sx, children }) => {
  const {  isTablet } = useContext(Context)

  return (
    <Box flexGrow={1} sx={{...sx }}  paddingBottom={isTablet ? 8 : 13}>
      {children}
    </Box>
  )
}
export default Main;
