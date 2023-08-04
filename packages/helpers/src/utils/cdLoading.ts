import type { LoadingOptions } from "element-plus";
import { ElLoading } from "element-plus";
import { throttle } from "lodash-es";
import "element-plus/es/components/loading/style/css";
import "element-plus/es/components/loading/style/index";

const loadingInstance: Record<string, ReturnType<typeof ElLoading.service>> = {};

class CdLoading {
  constructor(
    private readonly execLoading: (options?: LoadingOptions) => void,
    private readonly execClose: () => void
  ) {
    this.execLoading = execLoading;
    this.execClose = execClose;
  }
  public number = 0;
  public loading(options?: LoadingOptions, number = 1) {
    this.number += number;
    this.execLoading(options);
  }
  public throttleClose = throttle(
    function (this: CdLoading) {
      if (this.number <= 0) {
        this.execClose();
        this.number = 0;
      }
    },
    220,
    { leading: false }
  );
  public close(number = 1) {
    if (this.number > 0) {
      this.number -= Math.min(this.number, number);
      this.throttleClose();
    } else {
      this.forceClose();
    }
  }
  public forceClose() {
    this.number = 0;
    this.execClose();
    this.throttleClose.cancel();
  }
}

export const cdLoadingObject = {
  global: new CdLoading(
    (options?: LoadingOptions) => (loadingInstance.global = ElLoading.service(options)),
    () => loadingInstance.global?.close()
  ),
  layout: new CdLoading(
    (options?: LoadingOptions) => (loadingInstance.layout = ElLoading.service(Object.assign({ target: "#cd-main" }, options))),
    () => loadingInstance.layout?.close()
  )
};

export function openCdLoading(options?: LoadingOptions, number = 1, mode: keyof typeof cdLoadingObject = "global") {
  const loading = cdLoadingObject[mode];
  loading.loading(options, number);
  return loading;
}

export function closeCdLoading(force = false, number = 1, mode: keyof typeof cdLoadingObject = "global"): void {
  const loading = cdLoadingObject[mode];
  if (force) {
    loading.forceClose();
    return;
  }
  loading.close(number);
}
