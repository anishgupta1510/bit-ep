import { createClient } from "@sanity/client"

export const client = createClient({
    projectId:'yx603k9e',
    dataset: 'production',
    useCdn:false,
    apiVersion: '2021-08-31'
})