import { Button, Divider, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const navbarData = [
    {
        route: "/",
        pageName: "Import",
    },
    {
        route: "/design",
        pageName: "Design",
    },
    {
        route: "/export",
        pageName: "Export",
    },
    {
        route: "/contact",
        pageName: "Contact",
    },
];

const Navbar = () => {
    return (
        <>
            <Group className={styles.navbar}>
                {navbarData.map(({ route, pageName }, index) => (
                    <Link
                        to={route}
                        key={index}
                        className={`${styles.navbarButton} ${
                            index === 0 && styles.navbarButtonSelected
                        }`}
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
