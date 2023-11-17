import { Box } from "@chakra-ui/react";
import ReactSpeedometer, { CustomSegmentLabel } from "react-d3-speedometer";

// const CustomOverlay = () => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="148"
//       height="148"
//       viewBox="0 0 148 148"
//       fill="none"
//       style={{
//         position: "absolute",
//         top: "23%",
//         left: "30%",
//         transform: "translateX(-50%)",
//         zIndex: 2,
//       }}
//     >
//       <g filter="url(#filter0_d_837_27382)">
//         <circle cx="74" cy="98" r="50" fill="white" />
//         <text
//           x="52%"
//           y="65%"
//           textAnchor="middle"
//           alignmentBaseline="middle"
//           fill="black"
//           fontSize="16"
//         >
//           <tspan fontSize="14" dy="-8" fill="#F59E0B" fontWeight="700">
//             Caution
//           </tspan>
//           <tspan x="50%" dy="25" fontSize="20" fill="#F59E0B" fontWeight="700">
//             40%
//           </tspan>
//         </text>
//       </g>
//       <defs>
//         <filter
//           id="filter0_d_837_27382"
//           x="0"
//           y="0"
//           width="148"
//           height="148"
//           filterUnits="userSpaceOnUse"
//           color-interpolation-filters="sRGB"
//         >
//           <feFlood flood-opacity="0" result="BackgroundImageFix" />
//           <feColorMatrix
//             in="SourceAlpha"
//             type="matrix"
//             values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//             result="hardAlpha"
//           />
//           <feOffset />
//           <feGaussianBlur stdDeviation="12" />
//           <feComposite in2="hardAlpha" operator="out" />
//           <feColorMatrix
//             type="matrix"
//             values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"
//           />
//           <feBlend
//             mode="normal"
//             in2="BackgroundImageFix"
//             result="effect1_dropShadow_837_27382"
//           />
//           <feBlend
//             mode="normal"
//             in="SourceGraphic"
//             in2="effect1_dropShadow_837_27382"
//             result="shape"
//           />
//         </filter>
//       </defs>
//     </svg>
//   );
// };

const ErrorRate = () => {
  const customSegmentLabels: CustomSegmentLabel[] = [
    {
      text: "",
      color: "",
    },
    {
      text: "",
      color: "",
    },
    {
      text: "",
      color: "",
    },
  ];
  const speedometerOptions = {
    maxValue: 300,
    value: 150,
    needleColor: "black",
    segments: 3,
    width: 220,
    ringWidth: 30,
    segmentColors: ["#EF4444", "#F59E0B", "#62C28D"],
  };

  return (
    <>
      <Box zIndex={1}>
        <ReactSpeedometer
          {...speedometerOptions}
          forceRender={true}
          needleTransitionDuration={4000}
          customSegmentLabels={customSegmentLabels}
        />
      </Box>
      {/* <CustomOverlay /> */}
    </>
  );
};

export default ErrorRate;
