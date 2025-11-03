import {MdProductionQuantityLimits as icon} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'Hakkımızda',
  type: 'document',
  icon,

  fields: [
    defineField({
      name: 'images',
      title: 'Hakkımızda Resim',
      type: 'image',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'description',
      title: 'Hakkımızda Açıklama',
      type: 'about_description',
    }),
    defineField({
      name: 'video',
      title: 'Hakkımızda Video',
      type: 'about_video',
    }),
  ],

  preview: {
    select: {
      title: 'description.title',
    },
    prepare() {
      return {
        title: 'Hakkımızda',
      }
    },
  },
})

