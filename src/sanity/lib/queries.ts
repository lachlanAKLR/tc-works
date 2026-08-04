import { defineQuery } from "next-sanity";

export const INFORMATION_QUERY = defineQuery(`
  *[_type == "information"][0]{
    _id,
    _updatedAt,
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
      caption
    },
    about,
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

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    _id,
    footerImage {
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
    animationText,
    indexSubtitle
  }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(orderRank) {
    _id,
    title,
    subheading,
    year,
    services[]->{ 
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
    hoverImage {
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
    hoverVideo {
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
    "imageCount": count(projectImages),
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
    subtitle,
    slug,
    year,
    services[]->{ 
      _id,
      title,
      slug
    },
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
        alt,
        displayCaption
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
