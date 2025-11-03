import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '58zwhrr6',
    dataset: 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
    appId: 'p0d0uvnnl69ncsxeua8p7h47',
  },
})
