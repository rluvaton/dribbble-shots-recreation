import React from 'react';
import styles from './index.module.scss';
import { Shot } from '../../common/interfaces/shot';
import ShotPreview from './components/ShotPreview';
import { Layout, Typography } from 'antd';

const { Title } = Typography;
const { Header, Content } = Layout;


const ShowcasePage: React.FC = () => {
  const shots: Shot[] = new Array(10).fill(0).map((_, index) => ({
    id: index.toString(),
    name: `Shot ${index}`,
    description: 'some shot',
    link: `/h${index}`,
    originalShotLink: 'https://dribbble.com/shots/16249524-Inflight-Entertainment-Concept?showSimilarShots=true&_=1629132108757#',
    component: <span>Hello from shot {index}</span>,
  }));

  return (
    <Layout className={styles['layout']}>

      <Header>
        <Title className={styles['title']}>Showcase</Title>
      </Header>

      <Content className={styles['content']}>
        <div className={styles['showcase-container']}>
          {shots.map((shot) => <ShotPreview key={shot.id} {...shot} />)}
        </div>
      </Content>

    </Layout>
  );
}

export default ShowcasePage;
