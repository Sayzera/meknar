import {AiOutlineSetting as icon} from 'react-icons/ai'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Anasayfa Ayarları',
  type: 'document',
  icon,

  fields: [
    defineField({
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      description: 'Örnek: Banner resmi',
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
          description: 'Örnek: Banner alt',
          options: {
            isHighlighted: true,
          },
        },
      ],
    }),
    defineField({
      name: 'home_banner_slogan',
      title: 'Slogan',
      type: 'bannerSlogan',
    }),
    defineField({
      name: 'banner_description',
      title: 'Banner Açıklama',
      type: 'text',
      description: 'Örnek: Açıklama',
    }),
    defineField({
      name: 'product_titles',
      title: 'Ürün Başlıkları',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Örnek: Ürün başlıkları',
    }),
    defineField({
      name: 'button_phone',
      title: 'Button Telefon',
      type: 'string',
      description: 'Örnek: Button telefon numarası',
    }),
    defineField({
      name: 'paletlerimiz',
      title: 'Paletlerimiz',
      type: 'home_paletlerimiz',
    }),
    defineField({
      name: 'hizmetlerimiz',
      title: 'Hizmetlerimiz',
      type: 'home_hizmetlerimiz',
    }),
    defineField({
      name: 'sikca_sorulan_sorular',
      title: 'Sıkça Sorulan Sorular',
      type: 'home_sikca_sorulan_sorular',
    }),
    defineField({
      name: 'hala_sorulariniz_mi_var',
      title: 'Hala Sorularınız mı Var?',
      type: 'home_hala_sorulariniz_mi_var',
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Anasayfa Ayarları',
      }
    },
  },
})

