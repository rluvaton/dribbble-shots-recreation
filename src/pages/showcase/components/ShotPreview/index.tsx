import React from 'react';
import { Card } from 'antd';
import { Shot } from '../../../../common/interfaces/shot';
import ShotTitle from '../ShotTitle';

const { Meta } = Card;


const ShotPreview: React.FC<Shot> = (shot) => {
  return (
    <Card
      bordered={false}
      hoverable
      cover={shot.createComponent()}
    >
      <Meta
        title={<ShotTitle {...shot}/>}
        description={shot.description}/>
    </Card>
  );
}

export default ShotPreview;
