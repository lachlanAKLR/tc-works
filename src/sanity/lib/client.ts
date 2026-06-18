import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-01",
  useCdn: true,
  stega: {
    studioUrl: "http://localhost:3000",
  },
});
