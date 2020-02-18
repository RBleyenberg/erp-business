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

const ITEMS = 'items';
const CRM = 'crm';  // wordt ook de url opbouw
export const SECTIONS: {[key: string]: DocSection} = {
  [CRM]: {
    name: 'crm'
  },
  [ITEMS]: {
    name: 'articles'
  },
};


const DOCS: {[key: string]: DocCategory[]} = {
  [CRM]: [
    {
      id: 'main',  // wordt ook de url opbouw
      name: 'Main',
      items: [
        {
          id: 'autocomplete',
          name: 'Relaties'
        },
        {
          id: 'autocomplete',
          name: 'Contactpersonen'
        }
      ]
    },
    {
      id: 'applications',  // wordt ook de url opbouw
      name: 'Applications',
      items: [
        {
          id: 'autocomplete',
          name: 'Todos'
        },
        {
          id: 'autocomplete',
          name: 'Agenda'
        }
      ]
    },
    {
      id: 'general',
      name: 'General',
      items: [
        {
          id: 'autocomplete',
          name: 'CRM'
        },
        {
          id: 'autocomplete',
          name: 'Adressen'
        }
      ]
    }
  ],
  [ITEMS] : []
};

for (const category of DOCS[CRM]) {
  for (const doc of category.items) {
    doc.packageName = 'crm';
  }
}

for (const category of DOCS[ITEMS]) {
  for (const doc of category.items) {
    doc.packageName = 'items';
  }
}

const ALL_CRM = DOCS[CRM].reduce(
  (result: DocItem[], category: DocCategory) => result.concat(category.items), []);
const ALL_ITEMS = DOCS[ITEMS].reduce(
  (result: DocItem[], items: DocCategory) => result.concat(items.items), []);
const ALL_DOCS = ALL_CRM.concat(ALL_ITEMS);
const ALL_CATEGORIES = DOCS[CRM].concat(DOCS[ITEMS]);

@Injectable()
export class DocumentationItems {
  getCategories(section: string): DocCategory[] {
    return DOCS[section];
  }

  getItems(section: string): DocItem[] {
    if (section === CRM) {
      return ALL_CRM;
    }
    if (section === ITEMS) {
      return ALL_ITEMS;
    }
    return [];
  }

  getItemById(id: string, section: string): DocItem | undefined {
    const sectionLookup = section === 'items' ? 'items' : 'crm';
    console.log("sectionLookup " + sectionLookup)
    return ALL_DOCS.find(doc => doc.id === id && doc.packageName === sectionLookup);
  }

  getCategoryById(id: string): DocCategory | undefined {
    return ALL_CATEGORIES.find(c => c.id === id);
  }
}
