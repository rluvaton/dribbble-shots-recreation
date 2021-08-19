import React from 'react';
import styles from './index.module.scss';
import ShotPreview from './components/ShotPreview';
import { Layout, Typography } from 'antd';
import { allShots } from '../shots';

const { Title } = Typography;
const { Header, Content } = Layout;


const ShowcasePage: React.FC = () => {
  return (
    <Layout className={styles['layout']}>

      <Header>
        <Title className={styles['title']}>Showcase</Title>
      </Header>

      <Content className={styles['content']}>
        <div className={styles['showcase-container']}>
          {allShots.map((shot) => <ShotPreview key={shot.id} {...shot} />)}
        </div>
      </Content>

    </Layout>
  );
}

export default ShowcasePage;
