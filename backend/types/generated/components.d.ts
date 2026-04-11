import type { Schema, Struct } from '@strapi/strapi';

export interface AboutEducation extends Struct.ComponentSchema {
  collectionName: 'components_about_educations';
  info: {
    displayName: 'Education';
    icon: 'book';
  };
  attributes: {
    date: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    school: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutExperience extends Struct.ComponentSchema {
  collectionName: 'components_about_experiences';
  info: {
    displayName: 'Experience';
    icon: 'briefcase';
  };
  attributes: {
    company: Schema.Attribute.String;
    date: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    isCurrent: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutLanguage extends Struct.ComponentSchema {
  collectionName: 'components_about_languages';
  info: {
    displayName: 'Language';
    icon: 'globe';
  };
  attributes: {
    fluencyText: Schema.Attribute.String;
    level: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    percentage: Schema.Attribute.Integer;
  };
}

export interface AboutSkill extends Struct.ComponentSchema {
  collectionName: 'components_about_skills';
  info: {
    displayName: 'Skill';
    icon: 'code';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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
      'about.education': AboutEducation;
      'about.experience': AboutExperience;
      'about.language': AboutLanguage;
      'about.skill': AboutSkill;
      'content.media': ContentMedia;
      'content.rich-text': ContentRichText;
      'layout.columns': LayoutColumns;
      'project.spec': ProjectSpec;
    }
  }
}
