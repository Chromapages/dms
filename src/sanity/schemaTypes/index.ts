import { type SchemaTypeDefinition } from 'sanity'

import story from './story'
import journalPost from './journalPost'
import destination from './destination'
import service from './service'
import testimonial from './testimonial'
import siteSettings from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [story, journalPost, destination, service, testimonial, siteSettings],
}
