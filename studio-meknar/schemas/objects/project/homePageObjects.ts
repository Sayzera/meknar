import { defineType } from 'sanity';

/**
 * Home page banner slogan object schema
 */
export const bannerSlogan = defineType({
  name: 'bannerSlogan',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Slogan Başlık',
      type: 'text',
      description: 'Örnek: Başlık',
    },
    {
      name: 'last_title',
      title: 'Son Kelime',
      type: 'string',
      description: 'Örnek: Son Kelime',
    },
  ],
});

/**
 * Home page services section object schema
 */
export const hizmetlerimiz = defineType({
  name: 'home_hizmetlerimiz',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Başlık',
      type: 'string',
      description: 'Örnek: Başlık',
    },
    {
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      description: 'Örnek: Açıklama',
    },
  ],
});

/**
 * Home page FAQ section object schema
 */
export const sikca_sorulan_sorular = defineType({
  name: 'home_sikca_sorulan_sorular',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Başlık',
      type: 'string',
      description: 'Örnek: Başlık',
    },
    {
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      description: 'Örnek: Açıklama',
    },
  ],
});

/**
 * Home page questions section object schema
 */
export const hala_sorulariniz_mi_var = defineType({
  name: 'home_hala_sorulariniz_mi_var',
  title: 'Hala Sorularınız mı Var?',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Başlık',
      type: 'string',
      description: 'Örnek: Başlık',
    },
    {
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      description: 'Örnek: Açıklama',
    },
    {
      name: 'button_text',
      title: 'Button Text',
      type: 'string',
      description: 'Örnek: Button Text',
    },
    {
      name: 'button_link',
      title: 'Button Link',
      type: 'string',
      description: 'Örnek: Button Link',
    },
  ],
});

/**
 * Home page pallets section object schema
 */
export const home_paletlerimiz = defineType({
  name: 'home_paletlerimiz',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Başlık',
      type: 'string',
      description: 'Örnek: Başlık',
    },
    {
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      description: 'Örnek: Açıklama',
    },
  ],
});

