import { Container } from 'react-dom';
import React from 'react';

export const getAllHrefInContainer = (container: Container): any[] =>
  Array.from(container.querySelectorAll('[href]'))
    .map((el: { href: any } & any) => el.href);

// From https://stackoverflow.com/a/55631482/5923666
export const isReactFragment = (variableToInspect: any) => {
  // we doing !variableToInspect because null is an object
  if(typeof variableToInspect !== 'object' || !variableToInspect) {
    return false;
  }

  if (variableToInspect.type) {
    return variableToInspect.type === React.Fragment;
  }
  return variableToInspect === React.Fragment;
};
