export const getModelDeployments = (): Record<string, string> => {
  const env = process.env.AZURE_OPENAI_MODEL_DEPLOYMENTS;
  if (!env) {
    return {};
  }
  try {
    return JSON.parse(env) as Record<string, string>;
  } catch (e) {
    console.error("Failed to parse AZURE_OPENAI_MODEL_DEPLOYMENTS", e);
    return {};
  }
};

