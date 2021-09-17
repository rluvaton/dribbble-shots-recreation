import { ReactElement } from 'react';

export interface Shot {
  id: string;
  name: string;
  description?: string;

  // Link inside the website
  link?: string;

  // Path to the file
  // e.g. src/pages/shots/MultiPlayerInteraction
  directoryPath: string;

  // The Dribbble Shot
  originalShotLink?: string;

  author: {
    name: string;

    // Link to the Profile of the author in Dribbble
    link: string;
  }

  createComponent: (preview?: boolean) => ReactElement;
}
