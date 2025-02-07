import { Button, Divider, Group } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useNavbarStore } from "../../hooks/useNavbarStore";
import styles from "./Navbar.module.css";
import logo from "../../../static/images/logo.png";

const navbarData = [
    {
        number: 1,
        pageRoute: "/",
        pageName: "Import",
    },
    {
        number: 2,
        pageRoute: "/design",
        pageName: "Design",
    },
    {
        number: 3,
        pageRoute: "/results",
        pageName: "Results",
    },
    {
        number: 0,
        pageRoute: "/contact",
        pageName: "Contact",
    },
];

const Navbar = () => {
    const currentRoute = useLocation().pathname;
    const latestRouteNumber = useNavbarStore((state) => state.latestRoute);

    return (
        <div className={styles.navbarContainer}>
            <Group className={styles.navbar}>
                {/* <img
                    src={logo}
                    style={{
                        height: "5rem",
                        width: "5rem",
                        objectFit: "cover",
                        margin:"0.4rem 0"
                    }}
                /> */}
                {/* <img
                    src="/static/images/timber-structural-designer-icon.png"
                    height="2rem"
                    width="2rem"
                /> */}
                {navbarData.map(({ number, pageRoute, pageName }, index) => (
                    <Link
                        to={pageRoute}
                        key={index}
                        className={`${styles.navbarButton} ${
                            currentRoute === pageRoute &&
                            styles.navbarButtonSelected
                        }`}
                    >
                        <Button
                            variant="filled"
                            color="teal"
                            size="md"
                            disabled={number > latestRouteNumber}
                        >
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
