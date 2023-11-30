import AssistWalkerTwoToneIcon from '@mui/icons-material/AssistWalkerTwoTone';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import { useLocation, useNavigate } from 'react-router-dom';

export const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Menentukan tab aktif berdasarkan path
  const getActiveTab = (path) => {
    switch (path) {
      case '/':
        return 0;
      case '/myPost':
        return 3;
      // Tambahkan case lain untuk path yang berbeda
      default:
        return 0;
    }
  };

  // Menangani perubahan tab
  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 3:
        navigate('/myPost');
        break;
      // Tambahkan case lain untuk nilai yang berbeda
    }
  };

  const activeTab = getActiveTab(location.pathname);
  return (
    <BottomNavigation showLabels value={activeTab} onChange={handleChange}>
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Message" icon={<MessageIcon />} />
      <BottomNavigationAction label="Payments" icon={<PaymentIcon />} />
      <BottomNavigationAction label="My Posts" icon={<AssistWalkerTwoToneIcon />} />
    </BottomNavigation>
  );
};
