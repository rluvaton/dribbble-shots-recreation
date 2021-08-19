import { Container } from 'react-dom';

export const getAllHrefInContainer = (container: Container): any[] =>
  Array.from(container.querySelectorAll('[href]'))
    .map((el: { href: any } & any) => el.href);
