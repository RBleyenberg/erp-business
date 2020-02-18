import {Injectable} from '@angular/core';

export interface AdditionalApiDoc {
  name: string;
  path: string;
}

export interface DocItem {
  id: string;
  name: string;
  summary?: string;
  packageName?: string;
  examples?: string[];
  apiDocId?: string;
}

export interface DocCategory {
  id: string;
  name: string;
  items: DocItem[];
  summary?: string;
}

export interface DocSection {
  name: string;
  summary: string;
}

const CDK = 'cdk';
const CRM = 'crm';
export const SECTIONS: {[key: string]: DocSection} = {
  [CRM]: {
    name: 'CRM',
    summary: 'Angular Material comprises a range of crm which implement common ' +
    'interaction patterns according to the Material Design specification.'
  },
  [CDK]: {
    name: 'CDK',
    summary: 'The Component Dev Kit (CDK) is a set of tools that implement common interaction '
  },
};


const DOCS: {[key: string]: DocCategory[]} = {
  [CRM]: [
    {
      id: 'forms',
      name: 'Form Controls',
      summary: 'Controls that collect and validate user input.',
      items: [
        {
          id: 'autocomplete',
          name: 'Autocomplete',
          summary: 'Suggests relevant options as the user types.'
        }
      ]
    }
  ],
  [CDK] : []
};

for (const category of DOCS[CRM]) {
  for (const doc of category.items) {
    doc.packageName = 'material';
  }
}

for (const category of DOCS[CDK]) {
  for (const doc of category.items) {
    doc.packageName = 'cdk';
  }
}

const ALL_CRM = DOCS[CRM].reduce(
  (result: DocItem[], category: DocCategory) => result.concat(category.items), []);
const ALL_CDK = DOCS[CDK].reduce(
  (result: DocItem[], cdk: DocCategory) => result.concat(cdk.items), []);
const ALL_DOCS = ALL_CRM.concat(ALL_CDK);
const ALL_CATEGORIES = DOCS[CRM].concat(DOCS[CDK]);

@Injectable()
export class DocumentationItems {
  getCategories(section: string): DocCategory[] {
    return DOCS[section];
  }

  getItems(section: string): DocItem[] {
    if (section === CRM) {
      return ALL_CRM;
    }
    if (section === CDK) {
      return ALL_CDK;
    }
    return [];
  }

  getItemById(id: string, section: string): DocItem | undefined {
    const sectionLookup = section === 'cdk' ? 'cdk' : 'material';
    return ALL_DOCS.find(doc => doc.id === id && doc.packageName === sectionLookup);
  }

  getCategoryById(id: string): DocCategory | undefined {
    return ALL_CATEGORIES.find(c => c.id === id);
  }
}
