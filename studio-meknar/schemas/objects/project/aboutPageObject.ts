import { defineType } from 'sanity';

/**
 * About page description object schema
 */
export const about_description = defineType({
  name: 'about_description',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Başlık',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Açıklama',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'button_text',
      title: 'Buton Metni',
      type: 'string',
    },
    {
      name: 'button_link',
      title: 'Buton Linki',
      type: 'string',
    },
  ],
});

/**
 * About page video object schema
 */
export const about_video = defineType({
  name: 'about_video',
  title: 'Hakkımızda Video',
  type: 'object',
  fields: [
    {
      name: 'video_image',
      title: 'Resim',
      type: 'image',
      of: [{ type: 'image' }],
    },
    {
      name: 'title',
      title: 'Başlık',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Açıklama',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'video_link',
      title: 'Video Linki',
      type: 'string',
    },
  ],
});

