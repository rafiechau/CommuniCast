import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import { useState } from 'react';

const BottomBar = () => {
  const [value, setValue] = useState(0);
  <Box
    sx={{
      width: '100%',
      display: { xs: 'block', sm: 'none', position: 'fixed', bottom: 0, width: '100%', zIndex: 1000 },
    }}
  >
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Message" icon={<MessageIcon />} />
      <BottomNavigationAction label="Payments" icon={<PaymentIcon />} />
    </BottomNavigation>
  </Box>;
};

BottomBar.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(BottomBar);
