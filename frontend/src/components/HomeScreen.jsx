import { Button } from "@mui/material";
import { useSendLogoutMutation } from "../slices/authApiSlice";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useSendLogoutMutation();

  const navigate = useNavigate();

  const handleClick = () =>{
    sendLogout();
    navigate('/');
  };

  return (
    <Button onClick={handleClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Log Out </Button>
  )
};

export default HomeScreen;
