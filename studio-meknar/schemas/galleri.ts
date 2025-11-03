import {FaFileImage as icon} from 'react-icons/fa'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galleri',
  title: 'Galeri',
  type: 'document',
  icon,

  fields: [
    defineField({
      name: 'brand',
      title: 'Marka',
      type: 'string',
    }),
    defineField({
      name: 'overview',
      title: 'Açıklama',
      type: 'text',
      description: 'Galeri açıklaması giriniz.',
    }),
    defineField({
      name: 'images',
      title: 'Galeri Resmi',
      type: 'image',
      of: [{type: 'image'}],
      description: 'Örnek: Galeri resmi',
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
          description: 'Örnek: Galeri alt',
          options: {
            isHighlighted: true,
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'brand',
      subtitle: 'overview',
      media: 'images',
    },
    prepare({title = 'Galeri', subtitle, media}) {
      return {
        title,
        subtitle: subtitle || '',
        media,
      }
    },
  },
})
