import {Injectable} from '@angular/core';

export interface DocItem {
  id: string;
  name: string;
  summary?: string;
  packageName?: string;
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
}

const PRODUCTS = 'products';
const CRM = 'crm';
export const SECTIONS: {[key: string]: DocSection} = {
  [CRM]: {
    name: 'CRM'
  },
  [PRODUCTS]: {
    name: 'PRODUCTS'
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
  [PRODUCTS] : []
};

for (const category of DOCS[CRM]) {
  for (const doc of category.items) {
    doc.packageName = 'crm';
  }
}

for (const category of DOCS[PRODUCTS]) {
  for (const doc of category.items) {
    doc.packageName = 'products';
  }
}

const ALL_CRM = DOCS[CRM].reduce(
  (result: DocItem[], category: DocCategory) => result.concat(category.items), []);
const ALL_PRODUCTS = DOCS[PRODUCTS].reduce(
  (result: DocItem[], products: DocCategory) => result.concat(products.items), []);
const ALL_DOCS = ALL_CRM.concat(ALL_PRODUCTS);
const ALL_CATEGORIES = DOCS[CRM].concat(DOCS[PRODUCTS]);

@Injectable()
export class DocumentationItems {
  getCategories(section: string): DocCategory[] {
    return DOCS[section];
  }

  getItems(section: string): DocItem[] {
    if (section === CRM) {
      return ALL_CRM;
    }
    if (section === PRODUCTS) {
      return ALL_PRODUCTS;
    }
    return [];
  }

  getItemById(id: string, section: string): DocItem | undefined {
    const sectionLookup = section === 'products' ? 'products' : 'crm';
    console.log("sectionLookup " + sectionLookup)
    return ALL_DOCS.find(doc => doc.id === id && doc.packageName === sectionLookup);
  }

  getCategoryById(id: string): DocCategory | undefined {
    return ALL_CATEGORIES.find(c => c.id === id);
  }
}
