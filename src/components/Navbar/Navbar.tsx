import { Button, Divider, Group } from "@mantine/core";
import { Link } from "react-router-dom";
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
    const [appRoute, setAppRoute] = useState("/");
    const handleClick = (pageRoute: string) => {
        setAppRoute(pageRoute);
    };

    return (
        <>
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
                        <Button variant="filled" color="teal">
                            {pageName}
                        </Button>
                    </Link>
                ))}
            </Group>
            <Divider />
        </>
    );
};

export default Navbar;
