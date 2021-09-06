import MultiPlayerInteraction, { shot } from './';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('MultiPlayerInteraction', () => {

  function testComponentIsNotInPreview(element: React.ReactElement) {
    // Act
    render(element);

    // Assert
    const card = screen.getByTestId('card');

    expect(card).toHaveStyle({
      // The trailing space is required as animejs (out animation library) add a space at the end for some reason
      transform: 'scale(1) ',
    });
  }

  function testComponentIsInPreview(element: React.ReactElement) {
    // Act
    render(element);

    // Assert
    const card = screen.getByTestId('card');

    expect(card).toHaveStyle({
      // The trailing space is required as animejs (out animation library) add a space at the end for some reason
      transform: 'scale(0.5) ',
    });
  }

  describe('component', () => {


    it('should be defined', () => {
      expect(MultiPlayerInteraction).toBeDefined();
    });

    it('should render the card with scale 1 when not passing preview', () => {
      testComponentIsNotInPreview(<MultiPlayerInteraction/>);
    });

    it('should render the card with scale 0.5 when passing preview', () => {
      testComponentIsInPreview(<MultiPlayerInteraction preview/>);
    });

    it.todo('should decrease and then increase the scale when clicking the minus icon');
    it.todo('should decrease and then increase the scale when clicking the plus icon');
  });

  describe('shot', () => {
    it('should export shot object', () => {
      expect(shot).toBeDefined();
    });

    it('should return MultiPlayerInteraction component from the createComponent function', () => {
      // Act
      const component = shot.createComponent();

      // Assert
      expect(component.type).toEqual(MultiPlayerInteraction);
    });

    it('should return MultiPlayerInteraction component from the createComponent function when passing true as the preview', () => {
      // Act
      const component = shot.createComponent(true);

      // Assert
      expect(component.type).toEqual(MultiPlayerInteraction);
    });

    it('should render the card with scale 1 when not passing any arguments to the createComponent function', () => {
      // Arrange
      const element = shot.createComponent();

      // Act & Assert
      testComponentIsNotInPreview(element);
    });

    it('should render the card with scale 0.5 when passing true to the createComponent function', () => {
      // Arrange
      const element = shot.createComponent(true);

      // Act & Assert
      testComponentIsInPreview(element);
    });
  });
});
