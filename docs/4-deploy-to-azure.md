# ☁️ Deploy to Azure - GitHub Actions

The following steps describes how the application can be deployed to Azure App service using GitHub Actions.

## 🧬 Fork the repository

Fork this repository to your own organisation so that you can execute GitHub Actions against your own Azure Subscription.

## 🗝️ Configure secrets in your GitHub repository

### 1. AZURE_CREDENTIALS

The GitHub workflow requires a secret named `AZURE_CREDENTIALS` to authenticate with Azure. The secret contains the credentials for a service principal with the Contributor role on the resource group containing the container app and container registry.

1. Create a service principal with the Contributor role on the resource group that contains the Azure App Service.

   ```console
   az ad sp create-for-rbac
      --name <NAME OF THE CREDENTIAL> --role contributor --scopes /subscriptions/<SUBSCRIPTION ID>/resourceGroups/<RESOURCE GROUP> --sdk-auth --output json
   ```

2. Copy the JSON output from the command.

3. In the GitHub repository, navigate to Settings > Secrets > Actions and select New repository secret.

4. Enter `AZURE_CREDENTIALS` as the name and paste the contents of the JSON output as the value.

5. Select **Add secret**.

### 2. AZURE_APP_SERVICE_NAME

Under the same repository secrets add a new variable `AZURE_APP_SERVICE_NAME` to deploy to your Azure Web app. The value of this secret is the name of your Azure Web app e.g. `my-web-app-name` from the domain https://my-web-app-name.azurewebsites.net/

> **Note**
> If you used the Azure portal to set up deployment, it may have created an
> additional GitHub Actions workflow file. Delete that file and keep only the
> `open-ai-app.yml` workflow to avoid `409 Conflict` errors during deployment.

### 3. Run GitHub Actions

Once the secrets are configured, the GitHub Actions will be triggered for every code push to the repository. Alternatively, you can manually run the workflow by clicking on the "Run Workflow" button in the Actions tab in GitHub.

![Workflow screenshot](/docs/images/runworkflow.png)

## Additional OpenAI deployments

The Bicep templates deploy a default ChatGPT and embedding model. You can create extra deployments by passing them through the `additionalOpenAIDeployments` parameter. Each entry should define `name`, `modelName`, `modelVersion` and `capacity`:

```json
{
  "additionalOpenAIDeployments": {
    "value": [
      {
        "name": "gpt4turbo",
        "modelName": "gpt-4-turbo",
        "modelVersion": "2024-04-01",
        "capacity": 25
      }
    ]
  }
}
```

[Next](/docs/5-add-identity.md)
