import { pick } from "lodash-es";
import { computed } from "vue";

export const useComponentCommon = <T extends { [key: string]: any }>(
  props: T,
  picks: string[]
) => {
  const styleProps = computed(() => pick(props, picks));
  const handleClick = () => {
    if (props.actionType === "url" && props.url) {
      window.location.href = props.url;
    }
  };
  return {
    styleProps,
    handleClick,
  };
};
export default useComponentCommon;
