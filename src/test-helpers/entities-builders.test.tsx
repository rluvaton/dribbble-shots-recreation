import { shotBuilder } from './entities-builders';
import { isReactFragment } from './utils';

describe('shotBuilder', () => {

  it('should create a shot', () => {
    // Act
    const shot = shotBuilder();

    // Assert
    expect(shot).toBeObject();
    expect(typeof shot.id).toEqual('string');
    expect(typeof shot.name).toEqual('string');
    expect(typeof shot.description).toEqual('string');
    expect(typeof shot.link).toEqual('string');

    expect(typeof shot.directoryPath).toEqual('string');
    expect(shot.directoryPath).toStartWith('src/pages/shots/');

    expect(typeof shot.originalShotLink).toEqual('string');
    expect(shot.createComponent).toBeFunction();
    expect(isReactFragment(shot.createComponent())).toBeTruthy();

    expect(shot.author).toBeObject();
    expect(typeof shot.author.name).toEqual('string');
    expect(typeof shot.author.link).toEqual('string');
  });
});

