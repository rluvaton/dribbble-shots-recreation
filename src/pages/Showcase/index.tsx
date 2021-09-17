import React from 'react';
import styles from './index.module.scss';
import ShotPreview from './components/ShotPreview';
import { Layout, Typography } from 'antd';
import { allShots } from '../shots';
import GitHubIconButton from '../../common/components/GitHubIconButton';

const { Title } = Typography;
const { Header, Content } = Layout;


const Showcase: React.FC = () => {
  return (
    <Layout className={styles.layout}>

      <Header className={styles.header}>
        <GitHubIconButton className={styles.githubButton} iconClassName={styles.githubIcon}
                          href="https://github.com/rluvaton/dribbble-shots-recreation" />
        <Title className={styles.title}>Showcase</Title>
      </Header>

      <Content className={styles.content}>
        <div className={styles.showcaseContainer}>
          {allShots.map((shot) => <ShotPreview key={shot.id} {...shot} />)}
        </div>
      </Content>

    </Layout>
  );
}

export default Showcase;
