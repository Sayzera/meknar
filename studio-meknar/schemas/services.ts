import {GrServices as icon} from 'react-icons/gr'
import {defineField, defineType} from 'sanity'

interface PreviewProps {
  title?: string
  subtitle?: string
  media?: any
}

export default defineType({
  name: 'services',
  title: 'Hizmetlerimiz',
  type: 'document',
  icon,

  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
    }),
    defineField({
      name: 'overview',
      title: 'Açıklama',
      type: 'text',
      description: 'Hizmet açıklaması giriniz.',
    }),
    defineField({
      name: 'images',
      title: 'Hizmet Resmi',
      type: 'image',
      description: 'Örnek: Hizmet resmi',
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
          description: 'Örnek: Hizmet alt',
          options: {
            isHighlighted: true,
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'overview',
      media: 'images',
    },
    prepare({title = 'Hizmet', subtitle, media}: PreviewProps) {
      return {
        title,
        subtitle: subtitle || '',
        media,
      }
    },
  },
})
