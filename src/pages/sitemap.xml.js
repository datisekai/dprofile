import { prisma } from "~/server/db";
function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://datisekai.id.vn</loc>
     </url>
     ${posts
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`https://datisekai.id.vn/${slug}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function SiteMap(props) {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const projects = await prisma.project.findMany({
    where: {
      active: true,
    },
  });

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(projects);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
