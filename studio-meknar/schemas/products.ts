import {MdProductionQuantityLimits as icon} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

interface PreviewProps {
  title?: string
  subtitle?: string
  media?: any[]
}

export default defineType({
  name: 'products',
  title: 'Ürünler',
  type: 'document',
  icon,

  fields: [
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{type: 'categories'}],
      options: {buttonTitle: 'Add new category'},
    }),
    defineField({
      name: 'product_options',
      title: 'Ürün Seçenekleri',
      type: 'string',
      options: {
        list: [
          {title: 'En Çok Satanlar', value: '1'},
          {title: 'En Çok Öne Çıkanlar', value: '2'},
          {title: 'Fırsat Ürünleri', value: '3'},
          {title: 'Normal', value: '4'},
          {title: 'Varyant', value: '5'},
        ],
        layout: 'radio',
      },
      initialValue: '5',
    }),
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
    }),
    defineField({
      name: 'brand',
      title: 'Marka',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'product_rating',
    }),
    defineField({
      name: 'overview',
      title: 'Açıklama',
      type: 'array',
      description: 'Ürün açıklaması giriniz.',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'images',
      title: 'Ürün Resimleri',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'ozellikler',
      title: 'Ürün Özellikleri',
      type: 'array',
      of: [{type: 'product_features'}],
    }),
    defineField({
      name: 'sevkiyat',
      title: 'Sevkiyat',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'seo_description',
      title: 'SEO Açıklama',
      type: 'text',
      description: 'SEO açıklaması giriniz.',
    }),
    defineField({
      name: 'seo_keywords',
      title: 'SEO Anahtar Kelimeler',
      type: 'text',
      description: 'SEO anahtar kelimeleri giriniz.',
    }),
    defineField({
      name: 'seo_title',
      title: 'SEO Başlık',
      type: 'string',
      description: 'SEO başlığı giriniz.',
      initialValue: `| ${process.env.GATSBY_SITE_NAME || 'Karadeniz Palet'} - Ankara Toptan Palet`,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'images',
    },
    prepare({title = 'Ürün', subtitle, media}: PreviewProps) {
      return {
        title,
        subtitle: `/urunler/${subtitle || ''}`,
        media: media?.[0],
      }
    },
  },
})

