import { build, fake, sequence } from '@jackfranklin/test-data-bot';
import { Shot } from '../common/interfaces/shot';
import React from 'react';

export const shotBuilder = build<Shot>('Shot', {
  fields: {
    id: sequence((i) => i.toString()),
    name: fake(f => f.name.title()),
    description: fake(f => f.lorem.paragraph()),
    link: fake(f => `/${f.internet.domainWord()}`),
    originalShotLink: fake(f => `${f.internet.url()}/`),

    // We cast it to any as the value must be either string or Field (internal @jackfranklin/test-data-bot type) although it can access functions
    createComponent: (() => <></>) as any,
  },
});

