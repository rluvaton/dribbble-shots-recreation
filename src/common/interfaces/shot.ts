import { ReactElement } from 'react';

export interface Shot {
  id: string;
  name: string;
  description?: string;

  // Link inside the website
  link?: string;

  // The Dribbble Shot
  originalShotLink?: string;

  createComponent: (preview?: boolean) => ReactElement;
}
