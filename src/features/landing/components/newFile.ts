import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { onMounted, ref } from "vue";
import { requestAttractionList } from "../api";
import { CONTENT_TYPE } from "util/code";

export default (() => {
  const __VLS_setup = async () => {
    const modules = [EffectCoverflow, Pagination];
    const page = ref(1);
    const getAttractionList = async () => {
      await requestAttractionList({
        pgno: page.value,
        title: "휴양림",
        contentTypeId: CONTENT_TYPE.문화시설,
        sidoCode: 32,
        gugunCode: 18,
      });
    };
    onMounted(async () => {
      getAttractionList();
    });
    const __VLS_publicComponent = (await import("vue")).defineComponent({
      setup() {
        return {};
      },
    });

    const __VLS_componentsOption = {};

    let __VLS_name!: "AttractionCarousel";
    function __VLS_template() {
      let __VLS_ctx!: InstanceType<
        import("./__VLS_types.js").PickNotAny<
          typeof __VLS_publicComponent,
          new () => {}
        >
      > &
        InstanceType<
          import("./__VLS_types.js").PickNotAny<
            typeof __VLS_internalComponent,
            new () => {}
          >
        > & {};
      /* Components */
      let __VLS_localComponents!: NonNullable<
        typeof __VLS_internalComponent extends { components: infer C } ? C : {}
      > &
        typeof __VLS_componentsOption &
        typeof __VLS_ctx;
      let __VLS_otherComponents!: typeof __VLS_localComponents &
        import("./__VLS_types.js").GlobalComponents;
      let __VLS_own!: import("./__VLS_types.js").SelfComponent<
        typeof __VLS_name,
        typeof __VLS_internalComponent &
          typeof __VLS_publicComponent &
          (new () => { $slots: typeof __VLS_slots })
      >;
      let __VLS_components!: typeof __VLS_otherComponents &
        Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
      /* Style Scoped */
      type __VLS_StyleScopedClasses = {} & {
        "attraction-carousel"?: boolean;
      } & { swiper?: boolean } & { "swiper-slide"?: boolean } & {
        "swiper-slide"?: boolean;
      };
      let __VLS_styleScopedClasses!:
        | __VLS_StyleScopedClasses
        | keyof __VLS_StyleScopedClasses
        | (keyof __VLS_StyleScopedClasses)[];
      /* CSS variable injection */
      /* CSS variable injection end */
      let __VLS_templateComponents!: {} & import("./__VLS_types.js").WithComponent<
        "swiper",
        typeof __VLS_components,
        "Swiper",
        "swiper"
      > &
        import("./__VLS_types.js").WithComponent<
          "SwiperSlide",
          typeof __VLS_components,
          "SwiperSlide",
          "swiperSlide",
          "swiper-slide"
        >;
      __VLS_components.Swiper;
      __VLS_components.Swiper;
      __VLS_components.swiper;
      __VLS_components.swiper;
      // @ts-ignore
      [swiper, swiper];
      __VLS_components.SwiperSlide;
      __VLS_components.SwiperSlide;
      __VLS_components.SwiperSlide;
      __VLS_components.SwiperSlide;
      __VLS_components.SwiperSlide;
      __VLS_components.SwiperSlide;
      __VLS_components.SwiperSlide;
      __VLS_components.SwiperSlide;
      __VLS_components.SwiperSlide;
      __VLS_components.SwiperSlide;
      __VLS_components.SwiperSlide;
      __VLS_components.SwiperSlide;
      __VLS_components.SwiperSlide;
      __VLS_components.SwiperSlide;
      __VLS_components.swiperSlide;
      __VLS_components.swiperSlide;
      __VLS_components.swiperSlide;
      __VLS_components.swiperSlide;
      __VLS_components.swiperSlide;
      __VLS_components.swiperSlide;
      __VLS_components.swiperSlide;
      __VLS_components.swiperSlide;
      __VLS_components.swiperSlide;
      __VLS_components.swiperSlide;
      __VLS_components.swiperSlide;
      __VLS_components.swiperSlide;
      __VLS_components.swiperSlide;
      __VLS_components.swiperSlide;
      __VLS_components["swiper-slide"];
      __VLS_components["swiper-slide"];
      __VLS_components["swiper-slide"];
      __VLS_components["swiper-slide"];
      __VLS_components["swiper-slide"];
      __VLS_components["swiper-slide"];
      __VLS_components["swiper-slide"];
      __VLS_components["swiper-slide"];
      __VLS_components["swiper-slide"];
      __VLS_components["swiper-slide"];
      __VLS_components["swiper-slide"];
      __VLS_components["swiper-slide"];
      __VLS_components["swiper-slide"];
      __VLS_components["swiper-slide"];
      // @ts-ignore
      [
        SwiperSlide,
        SwiperSlide,
        SwiperSlide,
        SwiperSlide,
        SwiperSlide,
        SwiperSlide,
        SwiperSlide,
        SwiperSlide,
        SwiperSlide,
        SwiperSlide,
        SwiperSlide,
        SwiperSlide,
        SwiperSlide,
        SwiperSlide,
      ];
      {
        (({}) as JSX.IntrinsicElements).div;
        (({}) as JSX.IntrinsicElements).div;
        (__VLS_x as JSX.IntrinsicElements)["div"] = {
          class: "attraction-carousel",
        };
        {
          (({}) as JSX.IntrinsicElements).h1;
          (({}) as JSX.IntrinsicElements).h1;
          (__VLS_x as JSX.IntrinsicElements)["h1"] = {};
        }
        {
          __VLS_templateComponents.swiper;
          (__VLS_x as import("./__VLS_types.js").ComponentProps<
            typeof __VLS_templateComponents.swiper
          >) = {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: false,
            slidesPerView: "auto",
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            },
            pagination: true,
            modules: __VLS_ctx.modules,
          };
          // @ts-ignore
          [modules];
          {
            __VLS_templateComponents.SwiperSlide;
            (__VLS_x as import("./__VLS_types.js").ComponentProps<
              typeof __VLS_templateComponents.SwiperSlide
            >) = {};
            {
              (({}) as JSX.IntrinsicElements).img;
              (__VLS_x as JSX.IntrinsicElements)["img"] = {
                src: "https://swiperjs.com/demos/images/nature-1.jpg",
              };
            }
          }
          {
            __VLS_templateComponents.SwiperSlide;
            (__VLS_x as import("./__VLS_types.js").ComponentProps<
              typeof __VLS_templateComponents.SwiperSlide
            >) = {};
            {
              (({}) as JSX.IntrinsicElements).img;
              (__VLS_x as JSX.IntrinsicElements)["img"] = {
                src: "https://swiperjs.com/demos/images/nature-2.jpg",
              };
            }
          }
          {
            __VLS_templateComponents.SwiperSlide;
            (__VLS_x as import("./__VLS_types.js").ComponentProps<
              typeof __VLS_templateComponents.SwiperSlide
            >) = {};
            {
              (({}) as JSX.IntrinsicElements).img;
              (__VLS_x as JSX.IntrinsicElements)["img"] = {
                src: "https://swiperjs.com/demos/images/nature-3.jpg",
              };
            }
          }
          {
            __VLS_templateComponents.SwiperSlide;
            (__VLS_x as import("./__VLS_types.js").ComponentProps<
              typeof __VLS_templateComponents.SwiperSlide
            >) = {};
            {
              (({}) as JSX.IntrinsicElements).img;
              (__VLS_x as JSX.IntrinsicElements)["img"] = {
                src: "https://swiperjs.com/demos/images/nature-4.jpg",
              };
            }
          }
          {
            __VLS_templateComponents.SwiperSlide;
            (__VLS_x as import("./__VLS_types.js").ComponentProps<
              typeof __VLS_templateComponents.SwiperSlide
            >) = {};
            {
              (({}) as JSX.IntrinsicElements).img;
              (__VLS_x as JSX.IntrinsicElements)["img"] = {
                src: "https://swiperjs.com/demos/images/nature-5.jpg",
              };
            }
          }
          {
            __VLS_templateComponents.SwiperSlide;
            (__VLS_x as import("./__VLS_types.js").ComponentProps<
              typeof __VLS_templateComponents.SwiperSlide
            >) = {};
            {
              (({}) as JSX.IntrinsicElements).img;
              (__VLS_x as JSX.IntrinsicElements)["img"] = {
                src: "https://swiperjs.com/demos/images/nature-6.jpg",
              };
            }
          }
          {
            __VLS_templateComponents.SwiperSlide;
            (__VLS_x as import("./__VLS_types.js").ComponentProps<
              typeof __VLS_templateComponents.SwiperSlide
            >) = {};
            {
              (({}) as JSX.IntrinsicElements).img;
              (__VLS_x as JSX.IntrinsicElements)["img"] = {
                src: "https://swiperjs.com/demos/images/nature-7.jpg",
              };
            }
          }
        }
      }
      if (
        typeof __VLS_styleScopedClasses === "object" &&
        !Array.isArray(__VLS_styleScopedClasses)
      ) {
        __VLS_styleScopedClasses["attraction-carousel"];
      }
      declare var __VLS_slots: {};
      return __VLS_slots;
    }
    const __VLS_internalComponent = (await import("vue")).defineComponent({
      setup() {
        return {
          Swiper: Swiper,
          SwiperSlide: SwiperSlide,
          modules: modules,
        };
      },
    });
    return {} as typeof __VLS_publicComponent;
  };
  return {} as typeof __VLS_setup extends () => Promise<infer T> ? T : never;
})({} as any);
