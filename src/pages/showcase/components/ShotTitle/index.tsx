import React from 'react';
import styles from './index.module.scss';
import { Tooltip, Typography } from 'antd';
import { Shot } from '../../../../common/interfaces/shot';
import DribbbleIcon from '../../../../common/components/DribbbleIcon';

const { Text, Link } = Typography;


const ShotTitle: React.FC<Shot> = (shot) => {
  // We wrapping the name with fragment so it'll be a component
  let titleComponent = <>{shot.name}</>;

  if (shot.link) {
    titleComponent = (
      <Tooltip title="Click to enter the component">
        <Link href={shot.link}>{titleComponent}</Link>
      </Tooltip>
    )
  }

  return (
    <Text className={styles['shot-title']}>

      <Tooltip title="Original Shot">
        <Link href={shot.originalShotLink} className={styles['shot-link']}>
          <DribbbleIcon style={{ fontSize: '20px' }}/>
        </Link>
      </Tooltip>

      <Text>{titleComponent}</Text>
    </Text>
  );
}

export default ShotTitle;
