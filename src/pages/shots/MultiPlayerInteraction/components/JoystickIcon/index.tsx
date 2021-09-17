import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

export const _internalTesting = {
  testId: {
    svg: 'icon',
    joystickPath: 'joystick',
    cablePath: 'cable',
    buttonsGroup: 'buttons',
  },
};

export interface JoystickIconProps {
  joystickFill: string;
  cableFill: string;
  backgroundColor: string;

  animationProgress: number;
}

const svgViewBoxWidth = 2086.76;
const svgViewBoxStep = svgViewBoxWidth / 100;

const JoystickIcon: React.FC<JoystickIconProps> = ({ joystickFill, cableFill, backgroundColor, animationProgress }) => {
  const [viewBoxWidth, setViewBoxWidth] = useState(0);

  useEffect(() => {
    setViewBoxWidth(svgViewBoxStep * animationProgress)
  }, [animationProgress]);

  return (
    <svg
      data-testid={_internalTesting.testId.svg}

      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"

      // 100% so it will be responsive
      height="100%"
      width="100%"

      // we animate only the viewBox width to create the effect that the joystick
      // is moving from left to right and at the start the joystick is cropped until fully shown
      viewBox={`0 0 ${viewBoxWidth} 2797.45`}
      className={styles.joystickIcon}
    >

      {/*Controller*/}
      <g>
        {/*Controller body*/}
        <path
          data-testid={_internalTesting.testId.joystickPath}
          style={{ fill: joystickFill }}
          d="M1066.99+1434.47C1055.66+1434.47+1031.02+1434.97+1019.77+1434.97C942.477+1434.97+868.959+1434.97+868.959+1434.97L868.959+1533.5C790.581+1528.87+652.66+1531+638.74+1530.69C563.479+1529.01+472.951+1533.55+369.334+1615.13C294.166+1674.31+239.116+1789.7+233.709+1940.88C229.489+2058.8+224.326+2410.68+242.584+2453C261.454+2496.75+325.575+2577.24+435.427+2566.35C488.178+2561.12+537.25+2547.67+627.459+2460.97C665.196+2424.7+829.103+2143.93+883.959+2110.78C895.696+2103.69+1002.21+2102.03+1002.21+2102.03C1002.21+2102.03+1084.55+2101.53+1084.55+2101.53C1084.55+2101.53+1191.07+2103.19+1202.8+2110.28C1257.66+2143.43+1421.56+2424.23+1459.3+2460.5C1549.51+2547.2+1598.58+2560.62+1651.33+2565.85C1761.19+2576.74+1825.31+2496.25+1844.18+2452.5C1862.44+2410.18+1857.27+2058.33+1853.05+1940.41C1847.64+1789.23+1792.56+1673.81+1717.4+1614.63C1613.78+1533.05+1523.25+1528.51+1447.99+1530.19C1434.07+1530.5+1296.18+1528.4+1217.8+1533.03L1217.8+1434.47C1217.8+1434.47+1144.28+1434.47+1066.99+1434.47Z"
        />

        {/*
         We added shapes above the SVG instead of subtract the shapes from the controller (when we created the icon)
         because it makes very hard to add the controller shadow
         */}
        <g data-testid={_internalTesting.testId.buttonsGroup} style={{ fill: backgroundColor }}>

          {/* Right top circle */}
          <path
            d="M1447.24+1748.91C1447.24+1796.69+1486+1835.28+1533.77+1835.28C1581.54+1835.28+1620.15+1796.69+1620.15+1748.91C1620.15+1701.13+1581.54+1662.38+1533.77+1662.38C1486+1662.38+1447.24+1701.13+1447.24+1748.91Z"
          />

          {/* Right bottom circle */}
          <path
            d="M1274.05+1915.88C1274.05+1963.66+1312.85+2002.44+1360.61+2002.44C1408.38+2002.44+1446.99+1963.66+1446.99+1915.88C1446.99+1868.1+1408.38+1829.5+1360.61+1829.5C1312.85+1829.5+1274.05+1868.1+1274.05+1915.88Z"
          />

          {/* Left buttons */}
          <path
            d="M557.771+1821.07L465.49+1822.41L465.802+1908.72L557.771+1908.03L557.771+2001.66L658.865+2001.66L658.865+1908.03L765.302+1908.03L765.302+1821.07L658.865+1821.07L658.865+1730.44L557.771+1730.44L557.771+1821.07Z"
          />
        </g>
      </g>

      {/* Cable */}
      <g>
        <rect
          data-testid={_internalTesting.testId.cablePath}
          style={{ fill: cableFill }}
          x="967.654"
          width="140"
          height="1434"
        />
      </g>
    </svg>
  );
};

export default JoystickIcon;
