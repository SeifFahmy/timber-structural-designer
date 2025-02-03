import { Button, Divider, Group } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState } from "react";

const navbarData = [
    {
        pageRoute: "/",
        pageName: "Import",
    },
    {
        pageRoute: "/design",
        pageName: "Design",
    },
    {
        pageRoute: "/results",
        pageName: "Results",
    },
    {
        pageRoute: "/contact",
        pageName: "Contact",
    },
];

const Navbar = () => {
    const currentRoute = useLocation();
    const [appRoute, setAppRoute] = useState(currentRoute.pathname);
    const handleClick = (pageRoute: string) => {
        setAppRoute(pageRoute);
    };

    return (
        <div className={styles.navbarContainer}>
            <Group className={styles.navbar}>
                {navbarData.map(({ pageRoute, pageName }, index) => (
                    <Link
                        to={pageRoute}
                        key={index}
                        className={`${styles.navbarButton} ${
                            appRoute === pageRoute &&
                            styles.navbarButtonSelected
                        }`}
                        onClick={() => handleClick(pageRoute)}
                    >
                        <Button variant="filled" color="teal" size="md">
                            {pageName}
                        </Button>
                    </Link>
                ))}
            </Group>
            <Divider maw="var(--navbarWidth)" w="var(--navbarWidth)" />
        </div>
    );
};

export default Navbar;
