import React from 'react';
import { Card } from 'antd';
import { Shot } from '../../../../common/interfaces/shot';
import ShotTitle from '../ShotTitle';
import ShotCover from '../ShotCover';
import styles from './index.module.scss';

const { Meta } = Card;


const ShotPreview: React.FC<Shot> = (shot) => {
  return (
    <Card
      className={styles.card}
      bordered={false}
      hoverable
      cover={<ShotCover>{shot.createComponent(true)}</ShotCover>}
    >
      <Meta
        title={<ShotTitle {...shot}/>}
        description={shot.description}/>
    </Card>
  );
}

export default ShotPreview;
