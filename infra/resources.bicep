param name string
param resourceToken string
param openai_api_version string
param openAiLocation string
param openAiSkuName string
param chatGptDeploymentCapacity int
param chatGptDeploymentName string
param chatGptModelName string
param chatGptModelVersion string
param embeddingDeploymentName string
param embeddingDeploymentCapacity int
param embeddingModelName string
param location string = resourceGroup().location

var openai_name = toLower('${name}-aillm-${resourceToken}')
var keyVaultName = toLower('${name}-kv-${resourceToken}')
var storage_name = toLower('${name}sto${resourceToken}')

resource azureopenai 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: openai_name
  location: openAiLocation
  properties: {
    customSubDomainName: openai_name
    publicNetworkAccess: 'Enabled'
  }
  sku: {
    name: openAiSkuName
  }
}

resource kv 'Microsoft.KeyVault/vaults@2021-06-01-preview' = {
  name: keyVaultName
  location: location
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: subscription().tenantId
    enableRbacAuthorization: true
  }

  resource NEXTAUTH_SECRET 'secrets' = {
    name: 'NEXTAUTH-SECRET'
    properties: {
      contentType: 'text/plain'
      value: 'your-secret-value'
    }
  }
}

@batchSize(1)
resource llmdeployment 'Microsoft.CognitiveServices/accounts/deployments@2023-05-01' = [for deployment in [
  {
    name: chatGptDeploymentName
    model: {
      format: 'OpenAI'
      name: chatGptModelName
      version: chatGptModelVersion
    }
    sku: {
      name: 'GlobalStandard'
      capacity: chatGptDeploymentCapacity
    }
  }
  {
    name: embeddingDeploymentName
    model: {
      format: 'OpenAI'
      name: embeddingModelName
      version: '2'
    }
    capacity: embeddingDeploymentCapacity
  }
]: {
  parent: azureopenai
  name: deployment.name
  properties: {
    model: deployment.model
  }
  sku: deployment.sku
}]
