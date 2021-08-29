import { build, fake, perBuild, sequence } from '@jackfranklin/test-data-bot';
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


// Can't use falsy values as an override value (there is a pending PR to allow that)
// See https://github.com/jackfranklin/test-data-bot/issues/287
export const overrideTestDataBotWithFalsyValue = (value: any) => {
  // Using `perBuild` as a workaround as suggested here
  // https://github.com/jackfranklin/test-data-bot/pull/288#issuecomment-653240712
  return perBuild(() => value);
};
