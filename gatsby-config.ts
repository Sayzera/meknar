import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: process.env.GATSBY_SITE_NAME || `Meknar Mühendislik`,
    description: `Meknar Mühendislik`,
    twitterUsername: `@meknar`,
    image: ``,
    siteUrl: `https://meknar.com/`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-layout`,
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "58zwhrr6",
        dataset: "production",
        token:
          "skAo2GsBAgKHWrR7ToJBaAKncZBuKUUq4h1qsglwKgY00DGf1CNKK0f7UIOnSD9JjpSuoOoH4RalnN5i2",
        graphqlTag: "default",
        watchMode: true,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-postcss",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },

    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `poppins`,
          `source sans pro\:300,400,400i,700,800`, // you can also specify font weights and styles
        ],
        display: "swap",
      },
    },
  ],
};

export default config;
