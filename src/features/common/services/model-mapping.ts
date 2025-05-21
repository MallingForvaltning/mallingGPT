export type ModelDeploymentMap = Record<string, string>;

let cachedMapping: ModelDeploymentMap | null = null;

export const getModelDeploymentMapping = (): ModelDeploymentMap => {
  if (cachedMapping) {
    return cachedMapping;
  }

  const mappingEnv = process.env.AZURE_OPENAI_MODEL_DEPLOYMENTS;
  if (!mappingEnv) {
    cachedMapping = {};
    return cachedMapping;
  }

  try {
    cachedMapping = JSON.parse(mappingEnv) as ModelDeploymentMap;
  } catch (err) {
    console.warn(
      "Failed to parse AZURE_OPENAI_MODEL_DEPLOYMENTS:",
      err
    );
    cachedMapping = {};
  }

  return cachedMapping;
};
