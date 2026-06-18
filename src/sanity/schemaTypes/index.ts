import { type SchemaTypeDefinition } from "sanity";

import { informationType } from "./information";
import { blockContentType } from "./blockContentType";
import { titledList } from "./objects/titledList";
import { imageType } from "./objects/imageType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [informationType, blockContentType, titledList, imageType],
};
