import {AiOutlineSetting as icon} from 'react-icons/ai'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'İletişim Bilgileri',
  type: 'document',
  icon,

  fields: [
    {
      name: 'contact_image',
      title: 'Contact Image',
      type: 'image',
      description: 'Örnek: İletişim resmi',
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
          description: 'Örnek: İletişim alt',
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
    defineField({
      name: 'geo_location',
      title: 'Geo Location',
      type: 'contact_geo_location',
    }),
    defineField({
      name: 'contact_adress',
      title: 'Adres',
      type: 'contact_adress',
    }),
    defineField({
      name: 'contact_phone',
      title: 'Telefon',
      type: 'contact_phone',
    }),
    defineField({
      name: 'mail',
      title: 'E Posta',
      type: 'contact_mail',
    }),
    defineField({
      name: 'work_hours',
      title: 'Çalışma Saatleri',
      type: 'contact_work_hours',
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'İletişim Bilgileri',
      }
    },
  },
})

