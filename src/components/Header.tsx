'use client'

import React, { ReactNode } from "react";
import Link from "next/link";
import { Box, Flex, Text, Button, cookieStorageManager } from "@chakra-ui/react";
import { useCookies } from "next-client-cookies";

interface MenuItemProps {
    children : ReactNode
    isLast? : boolean
    to : string,
}

const MenuItem = ({ children, isLast, to="/", ...others } : MenuItemProps) => {
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...others}
    >
      <Link href={to}>{children}</Link>
    </Text>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const Header = ({...props}) => {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);
  const cookies = useCookies()

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      {...props}
    >
      <Flex align="center">
        RockerBoy
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <MenuIcon />}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/games">Games</MenuItem>
          <MenuItem to="/articles">Articles</MenuItem>
          {cookies.get('access_token') ? 
            <MenuItem to="/?logout=true">Logout</MenuItem>
            :
            <MenuItem to="/sign-in">Login</MenuItem>
          }
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
