'use client'

import { Flex } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useCookies } from "next-client-cookies";
import Hero from "@/components/Hero";
import { useEffect } from "react";

export default function Home() {
  const cookies = useCookies()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    if (searchParams.get('logout')) {
      cookies.remove('access_token')
    }
  }, [])

  return (
    <Flex
      direction="column"
      align="center"
      m="0 auto"
    >
      <Hero />
    </Flex>
  );
}
