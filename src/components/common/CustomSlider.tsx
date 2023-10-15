/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, BoxProps } from "@chakra-ui/react";

import { Swiper, SwiperProps } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import React, { ComponentProps } from "react";

interface CustomSliderProps extends ComponentProps<"div"> {
  SliderProps?: SwiperProps;
  BoxProps?: BoxProps;
  noOfSlides?: 3 | 6 | 1;
}

const slideBreakPointMap = {
  1: undefined,
  6: {
    320: {
      slidesPerView: 2,
      spaceBetween: 14,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 14,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 14,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 14,
    },
    1440: {
      slidesPerView: 6,
      spaceBetween: 14,
    },
  },
  3: {
    320: {
      slidesPerView: 1,
      spaceBetween: 14,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 14,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 14,
    },
  },
};

const CustomSlider = React.forwardRef(({ BoxProps, SliderProps, noOfSlides, children }: CustomSliderProps, ref) => {
  // const swiperRef = useRef({});
  // const [slideState, setSlideState] = useState<{
  //   isBeginning: boolean;
  //   isEnd: boolean;
  // }>({ isBeginning: true, isEnd: false });

  // useEffect(() => {
  //   if (!swiperRef) return;
  //   setSlideState({
  //     isBeginning: (swiperRef?.current as any)!.swiper.isBeginning,
  //     isEnd: (swiperRef?.current as any)!.swiper.isEnd,
  //   });
  // }, [swiperRef]);

  return (
    <Box flex={1} pos={"relative"} {...BoxProps}>
      <Swiper
        ref={ref as any}
        style={{ width: "100%" }}
        spaceBetween={14}
        slidesPerView={1}
        breakpoints={slideBreakPointMap[(noOfSlides as 6 | 3 | 1) || 6]}
        modules={[Pagination, Navigation]}
        {...SliderProps}
      >
        {children}
      </Swiper>
    </Box>
  );
});

export default CustomSlider;