import { defineQuery } from "next-sanity";

export const INFORMATION_QUERY = defineQuery(`
  *[_type == "information"][0]{
    _id,
    _updatedAt,
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

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(orderRank) {
    _id,
    title,
    subheading,
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
    mainVideo {
      cloudId,
      poster {
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
        }
      }
    },
    darkText,
    homeImageWidth,
    alignRight, 
    slug
  }
`);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    subheading,
    slug,
    year,
    services[]->{ 
      _id,
      title,
      slug
    },
    collaboratorsLabel,
    collaborators[]->{
      _id,
      title,
      slug
    },
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
    mainVideo {
      cloudId,
      poster {
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
        }
      }
    },
    homeImageWidth,
    darkText,
    info,
    projectImages[] {
      _type == "imageObject" => {
        "type": _type,
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
      _type == "videoObject" => {
        "type": _type,
        cloudId,
        poster {
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          },
          alt
        }
      }
    }
  }
`);
