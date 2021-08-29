import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

export const _internalTesting = {
  testId: {
    svg: 'icon',
    joystickPath: 'joystick',
    cablePath: 'cable',
  },
};

export interface JoystickIconProps {
  joystickFill: string;
  cableFill: string;
  animationProgress: number;
}

const svgViewBoxWidth = 1636.78;
const svgViewBoxStep = svgViewBoxWidth / 100;

const JoystickIcon: React.FC<JoystickIconProps> = ({ joystickFill, cableFill, animationProgress }) => {
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
      viewBox={`0 0 ${viewBoxWidth} 2339.48`}
      className={styles.joystickIcon}
    >
      {/* Joystick */}
      <g>
        <path
          data-testid={_internalTesting.testId.joystickPath}
          style={{ fill: joystickFill }}
          d="M841.562+1204.38C830.234+1204.38+805.596+1204.88+794.344+1204.88C717.05+1204.88+643.532+1204.88+643.531+1204.88L643.531+1303.41C565.154+1298.78+427.233+1300.9+413.312+1300.59C338.052+1298.91+247.524+1303.46+143.906+1385.03C68.739+1444.21+13.6885+1559.6+8.28125+1710.78C4.06132+1828.7-1.10135+2180.58+17.1562+2222.91C36.0262+2266.65+100.148+2347.14+210+2336.25C262.751+2331.02+311.823+2317.58+402.031+2230.88C439.769+2194.61+603.676+1913.84+658.531+1880.69C670.268+1873.59+776.781+1871.94+776.781+1871.94C776.781+1871.94+859.125+1871.44+859.125+1871.44C859.125+1871.44+965.638+1873.09+977.375+1880.19C1032.23+1913.34+1196.14+2194.14+1233.88+2230.41C1324.08+2317.11+1373.16+2330.52+1425.91+2335.75C1535.76+2346.64+1599.88+2266.15+1618.75+2222.41C1637.01+2180.08+1631.84+1828.23+1627.62+1710.31C1622.22+1559.13+1567.14+1443.71+1491.97+1384.53C1388.35+1302.96+1297.82+1298.41+1222.56+1300.09C1208.64+1300.4+1070.75+1298.31+992.375+1302.94L992.375+1204.38C992.375+1204.38+918.856+1204.38+841.562+1204.38ZM1308.34+1432.28C1356.11+1432.28+1394.72+1471.03+1394.72+1518.81C1394.72+1566.59+1356.11+1605.19+1308.34+1605.19C1260.58+1605.19+1221.81+1566.59+1221.81+1518.81C1221.81+1471.03+1260.58+1432.28+1308.34+1432.28ZM332.344+1500.34L433.438+1500.34L433.438+1590.97L539.875+1590.97L539.875+1677.94L433.438+1677.94L433.438+1771.56L332.344+1771.56L332.344+1677.94L240.375+1678.62L240.062+1592.31L332.344+1590.97L332.344+1500.34ZM1135.19+1599.41C1182.96+1599.41+1221.56+1638+1221.56+1685.78C1221.56+1733.56+1182.96+1772.34+1135.19+1772.34C1087.42+1772.34+1048.63+1733.56+1048.62+1685.78C1048.62+1638+1087.42+1599.41+1135.19+1599.41Z"
        />
      </g>

      {/* Cable */}
      <g>
        <rect
          data-testid={_internalTesting.testId.cablePath}
          style={{ fill: cableFill }}
          x="745.654"
          width="140"
          height="1206"
        />
      </g>
    </svg>
  );
};

export default JoystickIcon;
