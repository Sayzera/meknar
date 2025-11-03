import { defineType } from 'sanity';

/**
 * Product rating object schema
 */
export const productRating = defineType({
  name: 'product_rating',
  type: 'object',
  fields: [
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Örnek: Rating',
    },
    {
      name: 'view_count',
      title: 'Kaç kişi gördü',
      type: 'string',
      description: 'Örnek: Görüntülenme sayısı',
    },
  ],
});

