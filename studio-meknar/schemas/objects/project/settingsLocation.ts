import { defineField, defineType } from 'sanity';

/**
 * Settings location object schema
 */
export default defineType({
  name: 'settingsLocation',
  type: 'object',
  fields: [
    defineField({
      name: 'latitude',
      title: 'Enlem',
      type: 'number',
      description: 'Örnek: Enlem bilgisi',
    }),
    defineField({
      name: 'longitude',
      title: 'Boylam',
      type: 'number',
      description: 'Örnek: Boylam bilgisi',
    }),
  ],
});

