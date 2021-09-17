import React from 'react';
import { render } from '@testing-library/react';
import DesignedBy from './';
import { shotBuilder } from '../../../../../test-helpers/entities-builders';
import { getAllHrefInContainer } from '../../../../../test-helpers/utils';

describe('DesignedBy', () => {
  it('should be defined', () => {
    expect(DesignedBy).toBeDefined();
  });

  it('should render have the author name text and the designed by text', () => {
    // Arrange
    const { author } = shotBuilder();

    // Act
    const { container } = render(<DesignedBy author={author.name} link={author.link}/>);

    // Assert
    expect(container).toHaveTextContent(`Designed by ${author.name}`);

    const links = getAllHrefInContainer(container);
    expect(links).toEqual([author.link]);
  });
});
