import { render } from '@testing-library/react';
import { getAllHrefInContainer } from './utils';
import React from 'react';
import faker from 'faker';

describe('utils', () => {
  describe('getAllHrefInContainer', () => {
    it('should return empty array when there are no elements with href attribute', () => {
      // Arrange
      const { container } = render(<div/>);

      // Act
      const allLinkElements = getAllHrefInContainer(container);

      // Assert
      expect(allLinkElements).toHaveLength(0);
    });

    it('should return empty array when there is <a> element but without href attribute', () => {
      // Arrange
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      const { container } = render(<a>no href attribute</a>);

      // Act
      const allLinkElements = getAllHrefInContainer(container);

      // Assert
      expect(allLinkElements).toHaveLength(0);
    });

    it('should return array with 1 item when there is only one <a> elements with href attribute', () => {
      // Arrange
      const link = `${faker.internet.url()}/`;
      const { container } = render(<a href={link}>something</a>);

      // Act
      const allLinkElements = getAllHrefInContainer(container);

      // Assert
      expect(allLinkElements).toHaveLength(1);
      expect(allLinkElements).toContain(link);
    });

    it('should return array with multiple links when there is div element with multiple <a> tags with href attributes', () => {
      // Arrange
      const links = faker.datatype.array().map(() => `${faker.internet.url()}/`);

      const { container } = render(
        <div>
          {links.map((link, index) => (<a key={index} href={link}>Link #${index}</a>))}
        </div>,
      );

      // Act
      const allLinkElements = getAllHrefInContainer(container);

      // Assert
      expect(allLinkElements).toEqual(links);
    });
  });
});
