import { defineField, defineType } from 'sanity';
import { FaQuestion as icon } from 'react-icons/fa';

interface PreviewProps {
  title?: string;
  subtitle?: string;
}

/**
 * FAQ (Frequently Asked Questions) schema
 */
export default defineType({
  name: 'sss',
  title: 'Sıkça Sorulan Sorular',
  type: 'document',
  icon,

  fields: [
    defineField({
      name: 'question',
      title: 'Soru',
      type: 'string',
    }),
    defineField({
      name: 'answer',
      title: 'Cevap',
      type: 'text',
      description: 'Cevap giriniz.',
    }),
  ],

  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
    prepare({ title = 'Soru', subtitle }: PreviewProps) {
      return {
        title,
        subtitle: subtitle || '',
      };
    },
  },
});

