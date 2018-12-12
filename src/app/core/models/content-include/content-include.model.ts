import { ContentConfigurationParameters } from '../content-configuration-parameter/content-configuration-parameter.mapper';

export interface ContentInclude {
  definitionQualifiedName: string;
  id: string;
  pageletIDs?: string[];
  configurationParameters?: ContentConfigurationParameters;
}