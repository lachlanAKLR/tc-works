import { type SchemaTypeDefinition } from "sanity";

import { informationType } from "./informationType";
import { blockContentType } from "./blockContentType";
import { titledListType } from "./objects/titledListType";
import { imageType } from "./objects/imageType";
import { projectType } from "./projectType";
import { serviceTagType } from "./serviceTagType";
import { collaboratorTagType } from "./collaboratorTagType";
import { videoType } from "./objects/videoType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    informationType,
    blockContentType,
    titledListType,
    imageType,
    projectType,
    serviceTagType,
    collaboratorTagType,
    videoType,
  ],
};
