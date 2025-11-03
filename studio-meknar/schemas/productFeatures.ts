import {defineField, defineType} from 'sanity'

interface PreviewProps {
  title?: string
  subtitle?: string
}

export default defineType({
  name: 'product_features',
  title: 'Ürün Özellikleri',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Özellik Başlık',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Özellik Açıklama',
      type: 'text',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({title, subtitle}: PreviewProps) {
      return {
        title: title || 'Özellik',
        subtitle: subtitle || '',
      }
    },
  },
})

