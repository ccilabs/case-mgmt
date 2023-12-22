/** @jsxRuntime classic */
/** @jsx jsx */
import { useEffect, useState } from "react";
import Link from "next/link";
import { PageContainer } from "@keystone-6/core/admin-ui/components";
import { jsx, Heading } from "@keystone-ui/core";

import { ChakraProvider } from "@chakra-ui/react";
import { Box, Image, Badge } from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

function AirbnbCard() {
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  };

  const [data, setData] = useState("");

  useEffect(() => {
    async function aa() {
      const users = await client.query({
        query: gql`
          query GetUsers {
            users {
              name
            }
          }
        `,
      });

      setData(users);
    }
    aa();
  }, []);

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {property.title}
        </Box>

        <Box>
          {property.formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? "teal.500" : "gray.300"}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
        {JSON.stringify(data)}
      </Box>
    </Box>
  );
}

// Please note that while this capability is driven by Next.js's pages directory
// We do not currently support any of the auxillary methods that Next.js provides i.e. `getStaticProps`
// Presently the only export from the directory that is supported is the page component itself.
export default function CustomPage() {
  return (
    <ChakraProvider>
      <PageContainer
        css={{ backgroundColor: "pink" }}
        header={
          <Heading
            type="h3"
            css={{
              backgroundColor: "blue",
            }}
          >
            Custom Page
          </Heading>
        }
      >
        <h1
          css={{
            width: "100%",
            textAlign: "center",
          }}
        >
          This is a custom Admin UI Page
        </h1>
        <p
          css={{
            textAlign: "center",
          }}
        >
          It can be accessed via the route{" "}
          <Link href="/custom-page">/custom-page</Link>
        </p>
        <AirbnbCard />
      </PageContainer>
    </ChakraProvider>
  );
}
