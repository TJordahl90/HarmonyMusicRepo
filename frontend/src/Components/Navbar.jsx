import { Link, useMatch, useResolvedPath, useLocation } from "react-router-dom";
import { Container, Nav, Navbar as BS_Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect, useState } from "react";
import './Navbar.css';

export default function Navbar()
{
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
    );

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
    }, [location]);
      
    return ( 
        <BS_Navbar expand="lg" className="custom-navbar">
            <LinkContainer to="/">
                <Nav.Link className="home-link">House of Harmony Music</Nav.Link>
            </LinkContainer>

            <BS_Navbar.Toggle aria-controls="basic-navbar-nav" />

            <BS_Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    <LinkContainer to="/course-list">
                        <Nav.Link>Courses</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/contact">
                        <Nav.Link>Contact</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/about">
                        <Nav.Link>About</Nav.Link>
                    </LinkContainer>
                    {!isAuthenticated ? (
                        <>
                            <LinkContainer to="/register">
                                <Nav.Link>Register</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        </>
                    ) : (
                        <>
                            <LinkContainer to="/account">
                                <Nav.Link>Account</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/logout">
                                <Nav.Link>Logout</Nav.Link>
                            </LinkContainer>
                        </>
                    )}
                </Nav>
            </BS_Navbar.Collapse>
        </BS_Navbar>
    )
}

// not needed anymore
// function CustomLink({to, children, ...props}) {
//     const resolvedPath = useResolvedPath(to)
//     const isActive = useMatch({ path: resolvedPath.pathname, end: true })
//     const path = window.location.pathname
//     return (
//         <li className={path === to ? "active" : ""}>
//             <Link to={to} {...props}>
//                 {children}
//             </Link>
//         </li>
//     )
// }
