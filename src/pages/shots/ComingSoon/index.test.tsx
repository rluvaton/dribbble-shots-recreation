import ComingSoon, { shot } from './';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('ComingSoon', () => {

  describe('component', () => {
    it('should be defined', () => {
      expect(ComingSoon).toBeDefined();
    });

    it('should have the text "74%" as the progress', () => {
      // Act
      render(<ComingSoon />);

      // Assert
      screen.getByText('74%');
    });

    it('should have data-preview="true" attribute when passing preview: true', () => {
      // Act
      const { container } = render(<ComingSoon preview/>);

      // Assert
      // `container.firstChild` is the root element of your rendered element.
      // (from https://testing-library.com/docs/react-testing-library/api#container-1)
      expect(container.firstChild).toHaveAttribute('data-preview', 'true');
    });

    it('should have data-preview="false" attribute when not passing preview', () => {
      // Act
      const { container } = render(<ComingSoon />);

      // Assert
      // `container.firstChild` is the root element of your rendered element.
      // (from https://testing-library.com/docs/react-testing-library/api#container-1)
      expect(container.firstChild).toHaveAttribute('data-preview', 'false');
    });

    it('should have "COMING SOON" text with the attribute aria-valuenow="74" for the current progress', () => {
      // Act
      render(<ComingSoon />);

      // Assert
      screen.getByText('COMING SOON', {
        // Get the coming soon text, because we currently implement it using 2 texts and
        // we want to make sure that the right progress passed than we match we the `aria-valuenow` attribute
        //
        // We don't specify specific selector so in case the implementation changes (e.g. we would use `div` instead of span)
        // this test won't break
        selector: '*[aria-valuenow="74"]'
      });
    });

  });

  describe('shot', () => {
    it('should export shot object', () => {
      expect(shot).toBeDefined();
    });

    it('should return ComingSoon component from the createComponent function', () => {
      // Act
      const component = shot.createComponent();

      // Assert
      expect(component.type).toEqual(ComingSoon);
    });

    it('should return ComingSoon component from the createComponent function when passing true as the preview', () => {
      // Act
      const component = shot.createComponent(true);

      // Assert
      expect(component.type).toEqual(ComingSoon);
    });

  });
});
