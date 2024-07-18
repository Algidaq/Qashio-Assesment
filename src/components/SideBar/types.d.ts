export interface SubPage {
    name: string;
    link: string;
  }
  
export interface Page {
    name: string;
    link: string;
    icon: JSX.Element;
    subPages?: SubPage[];
  }