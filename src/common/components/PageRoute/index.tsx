import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

/**
 * React Router DOM Route that set the title based on the route title prop
 * @param title the title to set
 * @param rest the {@link Route} props
 * @constructor
 *
 * This is taken from {@link https://stackoverflow.com/a/55415722/5923666 StackOverflow answer}
 * and while someone {@link https://stackoverflow.com/questions/52447828/is-there-a-way-to-modify-the-page-title-with-react-router-v4#comment98351965_55415722 commented} that _it's not the React recommended way_ it's much cleaner IMO
 */
const PageRoute: React.FC<{ title: string } & React.ComponentProps<typeof Route>> = ({ title, ...rest }) => {
  useEffect(() => {
    document.title = title || '';
  }, [title]);

  return <Route {...rest} />;
};

export default PageRoute;
