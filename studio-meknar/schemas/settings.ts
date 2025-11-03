import {AiOutlineSetting as icon} from 'react-icons/ai'
import {defineField, defineType} from 'sanity'

interface PreviewProps {
  title?: string
}

/**
 * Site settings schema
 */
export default defineType({
  name: 'settings',
  title: 'Ayarlar',
  type: 'document',
  icon,

  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Örnek: Logo',
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
          description: 'Örnek: Logo alt',
          options: {
            isHighlighted: true,
          },
        },
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Telefon Numarası',
      type: 'string',
      description: 'Örnek: Telefon numaranız',
    }),
    defineField({
      name: 'mail',
      title: 'E Posta',
      type: 'string',
      description: 'Örnek: E posta adresiniz',
    }),
    defineField({
      name: 'discount_text',
      title: 'İndirim Metni',
      type: 'string',
      description: 'Örnek: İndirim metni',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
      description: 'Örnek: Instagram adresiniz',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'string',
      description: 'Örnek: Facebook adresiniz',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter',
      type: 'string',
      description: 'Örnek: Twitter adresiniz',
    }),
    defineField({
      name: 'youtube',
      title: 'Youtube',
      type: 'string',
      description: 'Örnek: Youtube adresiniz',
    }),
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'text',
      description: 'Örnek: Adres bilgileriniz',
    }),
    defineField({
      title: 'Lokasyon Bilgileri',
      name: 'settings_location',
      type: 'settingsLocation',
    }),
    defineField({
      name: 'google_maps',
      title: 'Google Maps',
      type: 'string',
      description: 'Örnek: Google Maps adresiniz',
    }),
    defineField({
      name: 'fax',
      title: 'Faks',
      type: 'string',
      description: 'Örnek: Faks numaranız',
    }),
    defineField({
      name: 'short_description',
      title: 'Kısa Açıklama',
      type: 'text',
      description: 'Örnek: Kısa açıklama',
    }),
  ],

  preview: {
    select: {
      title: 'short_description',
    },
    prepare({title}: PreviewProps) {
      return {
        title: 'Ayarlar',
        subtitle: title || '',
      }
    },
  },
})
