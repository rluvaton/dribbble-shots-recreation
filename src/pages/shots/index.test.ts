import { allShots } from './';
import React from 'react';

describe('Shots', () => {
  describe('allShots', () => {
    it('every shot should have unique id', () => {
      // Arrange
      const allShotsIdsArray = allShots.map(({ id }) => id);
      const allShotsIdsUniqueItems = Array.from(new Set(allShotsIdsArray));

      // Assert
      expect(allShotsIdsUniqueItems).toEqual(allShotsIdsArray);
    });

    it('every shot should have unique name', () => {
      // Arrange
      const allShotsNamesArray = allShots.map(({ name }) => name);
      const allShotsNamesUniqueItems = Array.from(new Set(allShotsNamesArray));

      // Assert
      expect(allShotsNamesUniqueItems).toEqual(allShotsNamesArray);
    });

    it('every shot should have unique link', () => {
      // Arrange
      const allShotsLinksArray = allShots.map(({ link }) => link);
      const allShotsLinksUniqueItems = Array.from(new Set(allShotsLinksArray));

      // Assert
      expect(allShotsLinksUniqueItems).toEqual(allShotsLinksArray);
    });

    it('every shot should a createComponent function that return a react node', () => {
      for (const { createComponent } of allShots) {
        // Act
        const component = createComponent();

        // Assert
        expect(typeof createComponent).toEqual('function');
        expect(React.isValidElement(component)).toBeTruthy();
      }
    });

    it('every shot should have all its data', () => {
      for (const shot of allShots) {

        // Assert
        expect(shot).toBeObject();
        expect(typeof shot.id).toEqual('string');
        expect(typeof shot.name).toEqual('string');
        expect(typeof shot.description).toEqual('string');
        expect(typeof shot.link).toEqual('string');

        expect(typeof shot.originalShotLink).toEqual('string');
        expect(shot.createComponent).toBeFunction();

        // null will return false although it valid (but we still check that because we don't wanna return null
        expect(React.isValidElement(shot.createComponent())).toBeTrue();
        expect(React.isValidElement(shot.createComponent(true))).toBeTrue();

        expect(shot.author).toBeObject();
        expect(typeof shot.author.name).toEqual('string');
        expect(typeof shot.author.link).toEqual('string');
      }
    });
  });
});
