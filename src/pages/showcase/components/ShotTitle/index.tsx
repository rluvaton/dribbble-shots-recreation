import React from 'react';
import styles from './index.module.scss';
import { Tooltip, Typography } from 'antd';
import { Shot } from '../../../../common/interfaces/shot';
import DribbbleIcon from '../../../../common/components/DribbbleIcon';
import { Link } from 'react-router-dom';

const { Text, Link: AntdLink } = Typography;

export type ShotTitleProps = Pick<Shot, 'name' | 'link' | 'originalShotLink'>;

const ShotTitle: React.FC<ShotTitleProps> = ({ name, link, originalShotLink }) => {
  // We wrapping the name with fragment so it'll be a component
  let titleComponent = <Text>{name}</Text>;

  if (link) {
    titleComponent = (
      <Tooltip title="Click to enter the component">
        <Link to={link} component={AntdLink}>{name}</Link>
      </Tooltip>
    )
  }

  let originalShotComponent = null;

  if (originalShotLink) {
    originalShotComponent = (
      <Tooltip title="Original Shot">
        <AntdLink href={originalShotLink} className={styles['shot-link']}>
          <DribbbleIcon style={{ fontSize: '20px' }}/>
        </AntdLink>
      </Tooltip>
    );
  }

  return (
    <div className={styles['shot-title']}>
      {originalShotComponent}
      <div>{titleComponent}</div>
    </div>
  );
}

export default ShotTitle;
