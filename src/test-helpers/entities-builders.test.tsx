import React from 'react';
import { shotBuilder } from './entities-builders';


describe('shotBuilder', () => {

  // From https://stackoverflow.com/a/55631482/5923666
  function isReactFragment(variableToInspect: any) {
    if (variableToInspect.type) {
      return variableToInspect.type === React.Fragment;
    }
    return variableToInspect === React.Fragment;
  }

  it('should create a shot', () => {
    // Act
    const shot = shotBuilder();

    // Assert
    expect(typeof shot).toEqual('object');
    expect(typeof shot.id).toEqual('string');
    expect(typeof shot.name).toEqual('string');
    expect(typeof shot.description).toEqual('string');
    expect(typeof shot.link).toEqual('string');
    expect(typeof shot.originalShotLink).toEqual('string');
    expect(typeof shot.createComponent).toEqual('function');
    expect(isReactFragment(shot.createComponent())).toBeTruthy();
  });
});

