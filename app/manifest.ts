import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BESDERWILL | Custom Bag Manufacturer",
    short_name: "BESDERWILL",
    description: "BESDERWILL custom school bag and backpack OEM/ODM manufacturing.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0d3764",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

