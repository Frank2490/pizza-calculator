import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pizza Calculator",
    short_name: "Pizza Calc",
    description: "Kalkulator ciasta do pizzy contemporanea",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF7",
    theme_color: "#C84B31",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
