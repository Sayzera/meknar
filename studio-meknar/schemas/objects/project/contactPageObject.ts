import { defineType } from 'sanity';

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
});

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
});

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
});

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
});

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
      description: 'Örnek: Çalışma Saatleri başlığı',
    },
    {
      name: 'work_hours',
      title: 'Çalışma Saatleri',
      type: 'string',
      description: 'Örnek: Çalışma Saatleri',
    },
  ],
});

