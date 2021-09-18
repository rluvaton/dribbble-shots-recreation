import React from 'react';
import { Typography } from 'antd';

const { Link, Text } = Typography;

interface DesignedByProps {
  author: string;
  link: string;
}

const DesignedBy: React.FC<DesignedByProps> = ({ author, link }) => {
  return (
    <Text>Designed by <Link href={link} title="link to the designer profile">{author}</Link></Text>
  )
}

export default DesignedBy;
