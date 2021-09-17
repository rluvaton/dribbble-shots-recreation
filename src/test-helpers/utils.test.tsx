import { render } from '@testing-library/react';
import { getAllHrefInContainer, isReactFragment } from './utils';
import React from 'react';
import faker from 'faker';
import { BrowserRouter as Router, Link } from 'react-router-dom';

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

    it('should return array with 1 item when there is only one <Link> elements with to attribute', () => {
      // Arrange
      const link = `/${faker.internet.domainWord()}`;
      const { container } = render(
        <Router>
          <Link to={link}>something</Link>
        </Router>,
      );

      // Act
      const allLinkElements = getAllHrefInContainer(container);

      // Assert
      expect(allLinkElements).toHaveLength(1);
      expect(allLinkElements).toContain(window.location.origin + link);
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

  describe('isReactFragment', () => {
    it('should return true when passing <></>', () => {
      // Arrange
      const node = <></>;

      // Act
      const result = isReactFragment(node);

      // Assert
      expect(result).toBeTrue();
    });
    it('should return true when non-empty <></>', () => {
      // Arrange
      const node = <>{faker.datatype.string()}</>;

      // Act
      const result = isReactFragment(node);

      // Assert
      expect(result).toBeTrue();
    });

    it('should return true when passing <React.Fragment></React.Fragment>', () => {
      // Arrange
      // noinspection CheckTagEmptyBody
      const node = <React.Fragment></React.Fragment>;

      // Act
      const result = isReactFragment(node);

      // Assert
      expect(result).toBeTrue();
    });

    it('should return true when passing <React.Fragment />', () => {
      // Arrange
      const node = <React.Fragment />;

      // Act
      const result = isReactFragment(node);

      // Assert
      expect(result).toBeTrue();
    });

    it('should return true when passing non empty React.Fragment', () => {
      // Arrange
      const node = <React.Fragment>{faker.datatype.string()}</React.Fragment>;

      // Act
      const result = isReactFragment(node);

      // Assert
      expect(result).toBeTrue();
    });

    it('should return false when passing div', () => {
      // Arrange
      // noinspection CheckTagEmptyBody
      const div = <div></div>;

      // Act
      const result = isReactFragment(div);

      // Assert
      expect(result).toBeFalse();
    });

    it('should return false when passing null', () => {
      // Arrange
      const node = null;

      // Act
      const result = isReactFragment(node);

      // Assert
      expect(result).toBeFalse();
    });

    it('should return false when passing object', () => {
      // Arrange
      const object = JSON.parse(faker.datatype.json());

      // Act
      const result = isReactFragment(object);

      // Assert
      expect(result).toBeFalse();
    });
  });
});
