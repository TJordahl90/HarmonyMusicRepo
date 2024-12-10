import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";

function AccountLogout() 
{
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const csrftoken = Cookies.get("csrftoken");

                console.log("CSRF token before logout:", csrftoken);
    
                const tokenData = {
                    headers: { 'X-CSRFToken': csrftoken },
                    withCredentials: true,
                };
                
                const logoutResponse = await axios.post('http://138.197.87.6:80/logout/', {}, tokenData);
                console.log("Logged out:", logoutResponse.data);
                
                localStorage.removeItem("userData");
                localStorage.setItem("isAuthenticated", "false");
                localStorage.setItem("isAuthorized", "false");
                navigate('/');
            } 
            catch(error) {
                console.error("Error logging out:", error);
            }
        };
    
        logout();
    }, [navigate]);

    return null;
}

export default AccountLogout;
