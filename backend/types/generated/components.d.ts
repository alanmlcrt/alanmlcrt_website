import type { Schema, Struct } from '@strapi/strapi';

export interface ContentMedia extends Struct.ComponentSchema {
  collectionName: 'components_content_medias';
  info: {
    description: 'Une image ou une vid\u00E9o';
    displayName: 'Media';
  };
  attributes: {
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface ContentRichText extends Struct.ComponentSchema {
  collectionName: 'components_content_rich_texts';
  info: {
    description: 'Un bloc de texte formatt\u00E9 en Markdown';
    displayName: 'Rich Text';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface LayoutColumns extends Struct.ComponentSchema {
  collectionName: 'components_layout_columns';
  info: {
    description: 'Une grille \u00E0 deux colonnes avec du texte';
    displayName: 'Two Columns';
  };
  attributes: {
    leftCol: Schema.Attribute.RichText;
    rightCol: Schema.Attribute.RichText;
  };
}

export interface ProjectSpec extends Struct.ComponentSchema {
  collectionName: 'components_project_specs';
  info: {
    displayName: 'Spec';
    icon: 'bulletList';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.media': ContentMedia;
      'content.rich-text': ContentRichText;
      'layout.columns': LayoutColumns;
      'project.spec': ProjectSpec;
    }
  }
}
