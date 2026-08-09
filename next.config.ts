import type {NextConfig} from "next";
import {withContentCollections} from "@content-collections/next";

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
      {source: "/ai", destination: "/resources", permanent: true},
      {source: "/investing", destination: "/resources", permanent: true},
      {source: "/growth", destination: "/resources", permanent: true},
    ];
  },
};

export default withContentCollections(nextConfig);
