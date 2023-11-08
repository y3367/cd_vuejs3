import type { NotificationParams } from "element-plus";
import { ElNotification } from "element-plus";
import "element-plus/es/components/notification/style/css";
import "element-plus/es/components/notification/style/index";

/**
 * [element-plus notification](https://element-plus.org/zh-CN/component/notification.html)
 * @param options
 */
export const cdNotify = (options?: NotificationParams) => {
  if (!options) {
    return;
  }

  ElNotification(Object.assign({ title: "Tip", type: "success", position: "top-right", showClose: true }, options));
};

/**
 * [element-plus notification](https://element-plus.org/zh-CN/component/notification.html)
 * type: "success"
 * @param title
 * @param options
 */
export const cdNotifySuccess = (title: string, options: NotificationParams = {}) => {
  cdNotify(Object.assign({}, options, { title, type: "success" }));
};

/**
 * [element-plus notification](https://element-plus.org/zh-CN/component/notification.html)
 * type: "error"
 * @param title
 * @param options
 */
export const cdNotifyError = (title: string, options: NotificationParams = {}) => {
  cdNotify(Object.assign({}, options, { title, type: "error" }));
};

/**
 * [element-plus notification](https://element-plus.org/zh-CN/component/notification.html)
 * type: "warning"
 * @param title
 * @param options
 */
export const cdNotifyWarning = (title: string, options: NotificationParams = {}) => {
  cdNotify(Object.assign({}, options, { title, type: "warning" }));
};

/**
 * [element-plus notification](https://element-plus.org/zh-CN/component/notification.html)
 * type: "info"
 * @param title
 * @param options
 */
export const cdNotifyInfo = (title: string, options: NotificationParams = {}) => {
  cdNotify(Object.assign({}, options, { title, type: "info" }));
};

export interface CdFeedbackProps {
  notify: typeof cdNotify;
  notifySuccess: typeof cdNotifySuccess;
  notifyError: typeof cdNotifyError;
  notifyWarning: typeof cdNotifyWarning;
  notifyInfo: typeof cdNotifyInfo;
}

export const CdFeedback: CdFeedbackProps = {
  notify: cdNotify,
  notifySuccess: cdNotifySuccess,
  notifyError: cdNotifyError,
  notifyWarning: cdNotifyWarning,
  notifyInfo: cdNotifyInfo
};
