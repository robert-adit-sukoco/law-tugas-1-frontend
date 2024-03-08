"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";


export default function Hero() {
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="nowrap"
      minH="70vh"
      px={8}
      mb={16}
    >
      <Stack
        spacing={4}
        w={{ base: "80%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          RockerBoy
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          The most honest video game review platform by gamers and for gamers!
        </Heading>
        <Flex direction={"row"}>
          <Link href={"/sign-up"}>
            <Button colorScheme="blue" borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
              Sign Up For Free
            </Button>
          </Link>
          <Link href={"/games"}>
            <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md" ml={4}>
              Browse Games
            </Button>
          </Link>
        </Flex>
        <Text
          fontSize="xs"
          mt={2}
          textAlign="center"
          color="primary.800"
          opacity="0.6"
        >
          No DLC required for full experience.
        </Text>
      </Stack>
      <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
        <Image src={"/hero-images/Hades.jpg"} rounded="1rem" shadow="2xl" />
      </Box>
    </Flex>
  );
}
