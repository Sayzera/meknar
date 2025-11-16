import {defineType} from 'sanity'

/**
 * Contact geo location object schema
 */
export const contact_geo_location = defineType({
  name: 'contact_geo_location',
  title: 'Geo Location',
  type: 'object',
  fields: [
    {
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      description: 'Örnek: Latitude',
    },
    {
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      description: 'Örnek: Longitude',
    },
  ],
})

/**
 * Contact address object schema
 */
export const contact_adress = defineType({
  name: 'contact_adress',
  title: 'Adres',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Adres Başlığı',
      type: 'string',
      description: 'Örnek: Adres başlığı',
    },
    {
      name: 'description',
      title: 'Adres Açıklama',
      type: 'string',
      description: 'Örnek: Adres açıklama',
    },
  ],
})

/**
 * Contact phone object schema
 */
export const contact_phone = defineType({
  name: 'contact_phone',
  title: 'Telefon',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Telefon Başlığı',
      type: 'string',
      description: 'Örnek: Telefon başlığı',
    },
    {
      name: 'phone',
      title: 'Telefon Numarası',
      type: 'string',
      description: 'Örnek: Telefon numarası',
    },
  ],
})

/**
 * Contact mail object schema
 */
export const contact_mail = defineType({
  name: 'contact_mail',
  title: 'E Posta',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'E Posta Başlığı',
      type: 'string',
      description: 'Örnek: E Posta başlığı',
    },
    {
      name: 'mail',
      title: 'E Posta',
      type: 'string',
      description: 'Örnek: E Posta',
    },
  ],
})

/**
 * Contact work hours day object schema
 */
export const work_hours_day = defineType({
  name: 'work_hours_day',
  title: 'Günlük Çalışma Saati',
  type: 'object',
  fields: [
    {
      name: 'day',
      title: 'Gün',
      type: 'string',
      description: 'Günü seçin',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Pazartesi', value: 'Pazartesi'},
          {title: 'Salı', value: 'Salı'},
          {title: 'Çarşamba', value: 'Çarşamba'},
          {title: 'Perşembe', value: 'Perşembe'},
          {title: 'Cuma', value: 'Cuma'},
          {title: 'Cumartesi', value: 'Cumartesi'},
          {title: 'Pazar', value: 'Pazar'},
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'is_closed',
      title: 'Kapalı mı?',
      type: 'boolean',
      description: 'Bu gün kapalı ise işaretleyin',
      initialValue: false,
    },
    {
      name: 'start_time',
      title: 'Başlangıç Saati',
      type: 'string',
      description: 'Örnek: 09:00',
      hidden: ({parent}) => parent?.is_closed === true,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const isClosed = (context.parent as any)?.is_closed
          if (!isClosed && !value) {
            return 'Başlangıç saati gerekli'
          }

          return true
        }),
      options: {
        timeFormat: 'HH:mm',
      },
    },
    {
      name: 'end_time',
      title: 'Bitiş Saati',
      type: 'string',
      description: 'Örnek: 18:00',
      hidden: ({parent}) => parent?.is_closed === true,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const isClosed = (context.parent as any)?.is_closed
          if (!isClosed && !value) {
            return 'Bitiş saati gerekli'
          }

          return true
        }),
      options: {
        timeFormat: 'HH:mm',
      },
    },
  ],
  preview: {
    select: {
      day: 'day',
      start_time: 'start_time',
      end_time: 'end_time',
      is_closed: 'is_closed',
    },
    prepare({day, start_time, end_time, is_closed}) {
      return {
        title: day,
        subtitle: is_closed ? 'Kapalı' : `${start_time || ''} - ${end_time || ''}`,
      }
    },
  },
})

/**
 * Contact work hours object schema
 */
export const contact_work_hours = defineType({
  name: 'contact_work_hours',
  title: 'Çalışma Saatleri',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Çalışma Saatleri Başlığı',
      type: 'string',
      description: 'Örnek: Çalışma Saatleri',
    },
    {
      name: 'days',
      title: 'Günlük Çalışma Saatleri',
      type: 'array',
      of: [{type: 'work_hours_day'}],
      description: 'Her gün için çalışma saatlerini ekleyin',
    },
  ],
})
