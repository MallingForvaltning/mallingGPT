import { OpenAI } from "openai";

type VersionMap = Record<string, string>;

let deploymentVersionMap: VersionMap | null = null;

const getApiVersion = (deployment: string): string | undefined => {
  if (!deploymentVersionMap) {
    const env = process.env.AZURE_OPENAI_DEPLOYMENT_API_VERSIONS;
    if (env) {
      try {
        deploymentVersionMap = JSON.parse(env) as VersionMap;
      } catch (err) {
        console.warn(
          "Failed to parse AZURE_OPENAI_DEPLOYMENT_API_VERSIONS:",
          err
        );
        deploymentVersionMap = {};
      }
    } else {
      deploymentVersionMap = {};
    }
  }

  return deploymentVersionMap[deployment] || process.env.AZURE_OPENAI_API_VERSION;
};

export const OpenAIInstance = (deploymentName?: string) => {
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const instanceName = process.env.AZURE_OPENAI_API_INSTANCE_NAME;
  const deployment = deploymentName || process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME;

  if (!apiKey || !instanceName || !deployment) {
    throw new Error(
      "Azure OpenAI endpoint config is not set, check environment variables."
    );
  }

  const endpointSuffix = process.env.AZURE_OPENAI_API_ENDPOINT_SUFFIX || "openai.azure.com";

  const openai = new OpenAI({
    apiKey,
    baseURL: `https://${instanceName}.${endpointSuffix}/openai/deployments/${deployment}`,
    defaultQuery: { "api-version": getApiVersion(deployment) },
    defaultHeaders: { "api-key": apiKey },
  });
  return openai;
};

export const OpenAIEmbeddingInstance = () => {
  if (
    !process.env.AZURE_OPENAI_API_KEY ||
    !process.env.AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME ||
    !process.env.AZURE_OPENAI_API_INSTANCE_NAME
  ) {
    throw new Error(
      "Azure OpenAI Embeddings endpoint config is not set, check environment variables."
    );
  }
  const endpointSuffix = process.env.AZURE_OPENAI_API_ENDPOINT_SUFFIX || "openai.azure.com";

  const openai = new OpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    baseURL: `https://${process.env.AZURE_OPENAI_API_INSTANCE_NAME}.${endpointSuffix}/openai/deployments/${process.env.AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME}`,
    defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION },
    defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },
  });
  return openai;
};

// a new instance definition for DALL-E image generation
export const OpenAIDALLEInstance = () => {
  if (
    !process.env.AZURE_OPENAI_DALLE_API_KEY ||
    !process.env.AZURE_OPENAI_DALLE_API_DEPLOYMENT_NAME ||
    !process.env.AZURE_OPENAI_DALLE_API_INSTANCE_NAME
  ) {
    throw new Error(
      "Azure OpenAI DALLE endpoint config is not set, check environment variables."
    );
  }
  const endpointSuffix = process.env.AZURE_OPENAI_API_ENDPOINT_SUFFIX || "openai.azure.com";

  const openai = new OpenAI({
    apiKey: process.env.AZURE_OPENAI_DALLE_API_KEY,
    baseURL: `https://${process.env.AZURE_OPENAI_DALLE_API_INSTANCE_NAME}.${endpointSuffix}/openai/deployments/${process.env.AZURE_OPENAI_DALLE_API_DEPLOYMENT_NAME}`,
    defaultQuery: {
      "api-version":
        process.env.AZURE_OPENAI_DALLE_API_VERSION || "2023-12-01-preview",
    },
    defaultHeaders: {
      "api-key": process.env.AZURE_OPENAI_DALLE_API_KEY,
    },
  });
  return openai;
};
