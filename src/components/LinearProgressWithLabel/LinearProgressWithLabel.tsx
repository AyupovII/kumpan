import { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { colors } from '../../constants/colors';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: "100%" }}>
      <Box sx={{
        width: '100%',
        mr: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.48)',
        height: "2.4rem",
        borderRadius: 5,
        display: "flex",
      }}
      >
        <Box
          sx={{
            width: `${props.value}%`,
            backgroundColor: colors.greenDark,
            height: "100%",
            borderRadius: 5,
            textAlign: 'center',
            transition: 'width 0.6s ease-in-out',

          }}
        >
          {Boolean(props.value) && <Typography variant="subtitle1" color="secondary" height={"inherit"} fontSize={14}>
            {`${Math.round(  props.value, )}%`}</Typography>}
        </Box>
        {!Boolean(props.value) && <Typography width={"100%"} textAlign={"center"} variant="subtitle1" color="secondary" height={"inherit"} fontSize={14} >0%</Typography>}
      </Box>
    </Box>
  );
}
export default LinearProgressWithLabel