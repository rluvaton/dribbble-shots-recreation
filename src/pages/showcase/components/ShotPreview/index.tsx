import React from 'react';
import { Card } from 'antd';
import { Shot } from '../../../../common/interfaces/shot';
import ShotTitle from '../ShotTitle';
import ShotCover from '../ShotCover';

const { Meta } = Card;


const ShotPreview: React.FC<Shot> = (shot) => {
  return (
    <Card
      bordered={false}
      hoverable
      cover={<ShotCover>{shot.createComponent()}</ShotCover>}
    >
      <Meta
        title={<ShotTitle {...shot}/>}
        description={shot.description}/>
    </Card>
  );
}

export default ShotPreview;
