import {BiCategoryAlt as icon} from 'react-icons/bi'
import {defineField, defineType} from 'sanity'

interface PreviewProps {
  title?: string
  media?: any
}

/**
 * Categories schema
 */
export default defineType({
  name: 'categories',
  title: 'Kategoriler',
  type: 'document',
  icon,

  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Örnek: Kategori resmi',
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
          description: 'Örnek: Kategori alt',
          options: {
            isHighlighted: true,
          },
        },
      ],
    }),
    defineField({
      name: 'category_name',
      title: 'Kategori Adı',
      type: 'string',
      description: 'Örnek: Kategori adı',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Örnek: slug',
      options: {
        source: 'category_name',
        maxLength: 96,
      },
    }),
  ],

  preview: {
    select: {
      title: 'category_name',
      media: 'image',
    },
    prepare({title, media}: PreviewProps) {
      return {
        title: title || 'Kategori',
        media,
      }
    },
  },
})
