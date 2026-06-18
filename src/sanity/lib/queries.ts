import { defineQuery } from "next-sanity";

export const INFORMATION_QUERY = defineQuery(`
  *[_type == "information"][0]{
    _id,
    about,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt
    },
    email,
    phone,
    instagram,
    linkedin,
    address,
    titledLists[]{
      title,
      items
    }
  }
`);
