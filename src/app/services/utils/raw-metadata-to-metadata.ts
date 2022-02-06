import { RawMetadata, Metadata } from '../../model';

export const rawMetadataToMetadata = (rawMetadata: RawMetadata): Metadata => {

	const result: any = {};

	result.github_url = rawMetadata.github_url;
 
	return result as Metadata;

};
