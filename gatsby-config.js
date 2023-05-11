module.exports = {
  siteMetadata: {
    siteUrl: "https://www.jonaskuiler.com",
    title: "JKSD",
    description: "Freelance Software Developer with a creative mindset.",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-mdx",
    "gatsby-plugin-robots-txt",
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`golos text:700,500,400`],
        display: "swap",
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
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "JKSD",
        short_name: "JKSD",
        start_url: "/",
        background_color: "#000000",
        theme_color: "#000000",
        display: "standalone",
        icon: "src/assets/favicon.svg",
      },
    },
  ],
};
