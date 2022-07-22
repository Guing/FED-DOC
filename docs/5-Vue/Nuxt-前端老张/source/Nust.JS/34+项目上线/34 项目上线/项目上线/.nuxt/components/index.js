export const CartLayout = () => import('../../components/cart/layout.vue' /* webpackChunkName: "components/cart-layout" */).then(c => wrapFunctional(c.default || c))
export const Foot = () => import('../../components/foot/foot.vue' /* webpackChunkName: "components/foot" */).then(c => wrapFunctional(c.default || c))
export const CourseInfoContainer = () => import('../../components/course/courseInfoContainer.vue' /* webpackChunkName: "components/course-info-container" */).then(c => wrapFunctional(c.default || c))
export const CoursePlayMain = () => import('../../components/course/coursePlayMain.vue' /* webpackChunkName: "components/course-play-main" */).then(c => wrapFunctional(c.default || c))
export const CourseCoursemain = () => import('../../components/course/coursemain.vue' /* webpackChunkName: "components/course-coursemain" */).then(c => wrapFunctional(c.default || c))
export const IndexCourseType = () => import('../../components/index/courseType.vue' /* webpackChunkName: "components/index-course-type" */).then(c => wrapFunctional(c.default || c))
export const IndexHeader = () => import('../../components/index/header.vue' /* webpackChunkName: "components/index-header" */).then(c => wrapFunctional(c.default || c))
export const IndexNavSwiper = () => import('../../components/index/navSwiper.vue' /* webpackChunkName: "components/index-nav-swiper" */).then(c => wrapFunctional(c.default || c))
export const IndexNewGoodCourse = () => import('../../components/index/newGoodCourse.vue' /* webpackChunkName: "components/index-new-good-course" */).then(c => wrapFunctional(c.default || c))
export const VerifitionVerify = () => import('../../components/verifition/Verify.vue' /* webpackChunkName: "components/verifition-verify" */).then(c => wrapFunctional(c.default || c))
export const VerifitionVerifyPoints = () => import('../../components/verifition/Verify/VerifyPoints.vue' /* webpackChunkName: "components/verifition-verify-points" */).then(c => wrapFunctional(c.default || c))
export const VerifitionVerifySlide = () => import('../../components/verifition/Verify/VerifySlide.vue' /* webpackChunkName: "components/verifition-verify-slide" */).then(c => wrapFunctional(c.default || c))
export const VerifitionUtilsAse = () => import('../../components/verifition/utils/ase.js' /* webpackChunkName: "components/verifition-utils-ase" */).then(c => wrapFunctional(c.default || c))
export const VerifitionUtilsAxios = () => import('../../components/verifition/utils/axios.js' /* webpackChunkName: "components/verifition-utils-axios" */).then(c => wrapFunctional(c.default || c))
export const VerifitionUtilsUtil = () => import('../../components/verifition/utils/util.js' /* webpackChunkName: "components/verifition-utils-util" */).then(c => wrapFunctional(c.default || c))
export const VerifitionApi = () => import('../../components/verifition/api/index.js' /* webpackChunkName: "components/verifition-api" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
