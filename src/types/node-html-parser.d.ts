declare module 'node-html-parser' {
  export class HTMLElement {
    nodeType: number;
    tagName: string;
    rawTagName: string;
    childNodes: Node[];
    parentNode: Node | null;
    
    getAttribute(name: string): string | null;
    setAttribute(name: string, value: string): void;
    removeAttribute(name: string): void;
    toString(): string;
    replaceWith(newNode: Node | string): void;
    querySelectorAll(selector: string): HTMLElement[];
  }
  
  export class Node {
    nodeType: number;
    childNodes: Node[];
    toString(): string;
  }
  
  export function parse(html: string, options?: any): HTMLElement;
} 