import ComingSoon, { shot } from './';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('ComingSoon', () => {

  describe('component', () => {
    it('should be defined', () => {
      expect(ComingSoon).toBeDefined();
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
