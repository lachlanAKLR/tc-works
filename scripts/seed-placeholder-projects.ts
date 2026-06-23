// ./scripts/seed-placeholder-projects.ts
//
// Duplicates the real "Kit" project 10 times as placeholder content.
// Reuses the same image assets, services, and collaborators — only the
// title, subheading, and slug change per duplicate, so each document
// is unique enough to save (Sanity requires unique slugs) without
// needing new images or tags right now.
//
// Run with: npx sanity exec scripts/seed-placeholder-projects.ts --with-user-token

import { getCliClient } from "sanity/cli";

const client = getCliClient();

const COUNT = 10;

// Pulled directly from the real "Kit" document
const KIT_REFERENCE = {
  collaborators: [
    "0ac45bd9-38ba-4454-9d81-84218370ed02",
    "2177dfa0-4003-407b-8c41-99a7ffa547ab",
    "b42f589c-2f80-4459-80cd-292e16fc9f5d",
  ],
  services: [
    "0c0a601b-1484-47f8-833a-fe8cde02443f",
    "a54d9952-cb87-4b05-95ee-d5971c4da545",
    "59fac7d1-4ed6-45ed-ac51-7ffe4d978200",
    "4e0547f9-540e-4d29-aa7d-025d334373f1",
  ],
  mainImageAssetRef: "image-3913150a72ecc6e921e23ea7fc171f8a0a2ebaea-1426x1800-png",
  projectImageAssetRefs: [
    "image-4ac380b1e2c9ffcee552f43202db9cbb6c7f3b7e-1426x1800-png",
    "image-176339af15ce75a5190b8a10a49f42a09ec4bcca-1440x1800-png",
    "image-51a5dc3b36afacf6bb26b4b7927a8c793106496b-1426x1800-png",
    "image-efde802b0692258234501f2cf226f12e773957f8-1584x1800-png",
  ],
  videoCloudId: "5e7971b06a9c001e6527128f578a75fe",
  videoPosterAssetRef: "image-cae090300fd91092ab331ad5fed08688c56d53e7-4045x2500-png",
  info: [
    {
      _type: "block" as const,
      style: "normal" as const,
      children: [
        {
          _type: "span" as const,
          marks: [],
          text: "Located on the far south east coast of Australia, the small town of Bega is known for beautiful scenery, food and wine, and a thriving local arts community. But could it also become a world-class destination for contemporary art? Introducing the South East Centre for Contemporary Art (SECCA) — a dramatic reimagining and redevelopment of the town's existing art gallery to strategically position it as a conduit between this remote and beautiful region and the wider world of arts, culture and ideas.",
        },
      ],
      markDefs: [],
    },
    {
      _type: "block" as const,
      style: "normal" as const,
      children: [
        {
          _type: "span" as const,
          marks: [],
          text: "The striking new building by Sibling Architecture provided cues for the identity, with cutaways in the porous facade inspiring a custom stencilled display typeface, designed in collaboration with Wei Huang. Riffing on the geometry and details of the architecture, the letterforms also speak to ideas of openness and breaking of boundaries, providing a distinctive graphic language for the gallery that extends from promotional materials through to details in signage and wayfinding.",
        },
      ],
      markDefs: [],
    },
  ],
};

function randomKey() {
  return Math.random().toString(16).slice(2, 14);
}

function buildPlaceholderProject(index: number) {
  const n = index + 1;

  return {
    _type: "project",
    title: `Placeholder Project ${n}`,
    subheading: "with Base Design",
    slug: {
      _type: "slug",
      current: `placeholder-project-${n}`,
    },
    year: "2024",
    services: KIT_REFERENCE.services.map((ref) => ({
      _key: randomKey(),
      _type: "reference",
      _ref: ref,
    })),
    collaborators: KIT_REFERENCE.collaborators.map((ref) => ({
      _key: randomKey(),
      _type: "reference",
      _ref: ref,
    })),
    mainImage: {
      _type: "imageObject",
      alt: `Placeholder Project ${n}.`,
      asset: {
        _type: "reference",
        _ref: KIT_REFERENCE.mainImageAssetRef,
      },
    },
    info: KIT_REFERENCE.info.map((block) => ({
      ...block,
      _key: randomKey(),
      children: block.children.map((child) => ({
        ...child,
        _key: randomKey(),
      })),
    })),
    projectImages: [
      ...KIT_REFERENCE.projectImageAssetRefs.map((ref) => ({
        _key: randomKey(),
        _type: "imageObject",
        alt: `Placeholder Project ${n}.`,
        asset: {
          _type: "reference",
          _ref: ref,
        },
      })),
      {
        _key: randomKey(),
        _type: "videoObject",
        cloudId: KIT_REFERENCE.videoCloudId,
        poster: {
          _type: "imageObject",
          alt: "Video Poster, Placeholder.",
          asset: {
            _type: "reference",
            _ref: KIT_REFERENCE.videoPosterAssetRef,
          },
        },
      },
    ],
  };
}

async function seed() {
  console.log(`Project ID: ${client.config().projectId}`);
  console.log(`Dataset: ${client.config().dataset}`);
  console.log(`Creating ${COUNT} placeholder projects...`);

  const transaction = client.transaction();

  for (let i = 0; i < COUNT; i++) {
    transaction.create(buildPlaceholderProject(i));
  }

  try {
    const res = await transaction.commit();
    console.log(`Done — created ${res.results.length} documents.`);
  } catch (err) {
    console.error("Failed to seed placeholder projects:", err);
  }
}

seed();
