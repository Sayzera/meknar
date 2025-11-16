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
      type: 'array',
      description: 'Hizmet açıklaması giriniz.',
      of: [{type: 'block'}],
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
      overview: 'overview',
      media: 'images',
    },
    prepare({title = 'Hizmet', overview, media}: any) {
      // Eğer overview array ise (block content), ilk block'un text'ini al
      let subtitle = ''
      if (Array.isArray(overview) && overview.length > 0) {
        const firstBlock = overview[0]
        if (firstBlock?.children && firstBlock.children.length > 0) {
          subtitle = firstBlock.children
            .map((child: any) => child.text)
            .join('')
            .slice(0, 100) // İlk 100 karakter
        }
      } else if (typeof overview === 'string') {
        subtitle = overview.slice(0, 100)
      }

      return {
        title,
        subtitle: subtitle || 'Açıklama yok',
        media,
      }
    },
  },
})
