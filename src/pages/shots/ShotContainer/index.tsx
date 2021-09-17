import React from 'react';
import styles from './index.module.scss';
import { Shot } from '../../../common/interfaces/shot';
import DesignedBy from './components/DesignedBy';
import DribbbleIcon from '../../../common/components/DribbbleIcon';
import { Typography } from 'antd';
import GitHubIconButton from '../../../common/components/GitHubIconButton';

const { Link } = Typography;

interface ShotContainerProps {
  shot: Shot
}

const ShotContainer: React.FC<ShotContainerProps> = ({ shot }) => {
  return (
    <div className={styles.shotContainer}>
      <div className={styles.component}>{shot.createComponent()}</div>

      <div className={styles.info}>
        <GitHubIconButton
          title="Shot source in GitHub"
          className={styles.githubButton}
          href={`https://github.com/rluvaton/dribbble-shots-recreation/tree/main/${shot.directoryPath}`}
        />

        <Link href={shot.originalShotLink} className={styles.shotLink} title="Dribbble shot">
          <DribbbleIcon style={{ fontSize: '20px' }}/>
        </Link>

        <DesignedBy author={shot.author.name} link={shot.author.link}/>
      </div>

    </div>
  )
}

export default ShotContainer;
