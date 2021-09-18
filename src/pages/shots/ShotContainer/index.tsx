import React from 'react';
import styles from './index.module.scss';
import { Shot } from '../../../common/interfaces/shot';
import DesignedBy from './components/DesignedBy';
import DribbbleIcon from '../../../common/components/DribbbleIcon';
import { Typography } from 'antd';
import GitHubIconButton from '../../../common/components/GitHubIconButton';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Link: AntdLink } = Typography;

interface ShotContainerProps {
  shot: Shot
}

const ShotContainer: React.FC<ShotContainerProps> = ({ shot }) => {
  return (
    <div className={styles.shotContainer}>
      <div className={styles.component}>{shot.createComponent()}</div>

      <div className={styles.info}>

        <Link to="/" title="Home" className={`${styles.iconContainer} ${styles.homeLink} regular-line-height`}>
          <HomeOutlined className={`${styles.icon} ${styles.homeIcon}`} />
        </Link>

        <GitHubIconButton
          title="Shot source in GitHub"
          className={`${styles.iconContainer} ${styles.githubButton}`}
          iconClassName={styles.icon}
          href={`https://github.com/rluvaton/dribbble-shots-recreation/tree/main/${shot.directoryPath}`}
        />

        <AntdLink href={shot.originalShotLink} className={`${styles.iconContainer} regular-line-height`} title="Dribbble shot">
          <DribbbleIcon className={styles.icon}/>
        </AntdLink>

        <DesignedBy author={shot.author.name} link={shot.author.link}/>
      </div>

    </div>
  )
}

export default ShotContainer;
