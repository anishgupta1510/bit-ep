import { createClient } from "@sanity/client"

export const client = createClient({
    projectId:"yx603k9e",
    useCdn:false,
    dataset:"production"
})