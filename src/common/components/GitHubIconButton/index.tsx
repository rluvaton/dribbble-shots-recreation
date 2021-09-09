import { GithubOutlined } from '@ant-design/icons';
import React from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';


const GitHubIconButton: React.FC<{ iconClassName?: string } & React.ComponentProps<typeof Button>> = ({iconClassName, className: buttonClassName, ...buttonProps}) => (
  <Button type="text"
          {...buttonProps}
          className={`${styles.githubButton} ${buttonClassName || ''}`}
          icon={<GithubOutlined className={`${styles.githubIcon} ${iconClassName || ''}`}/>}
  />
);


export default GitHubIconButton;
