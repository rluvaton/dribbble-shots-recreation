import React from 'react';
import { Typography } from 'antd';

const { Link } = Typography;

interface DesignedByProps {
  author: string;
  link: string;
}

const DesignedBy: React.FC<DesignedByProps> = ({ author, link }) => {
  return (
    <span>Designed by <Link href={link} title="link to the designer profile">{author}</Link></span>
  )
}

export default DesignedBy;
