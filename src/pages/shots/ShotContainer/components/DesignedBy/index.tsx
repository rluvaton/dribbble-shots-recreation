import React from 'react';
import styles from './index.module.scss';
import { Typography } from 'antd';

const { Link } = Typography;

interface DesignedByProps {
  author: string;
  link: string;
}

const DesignedBy: React.FC<DesignedByProps> = ({ author, link }) => {
  return (
    <span className={styles.designedBy}>Designed by <Link href={link}>{author}</Link></span>
  )
}

export default DesignedBy;
