import type { NotificationParams } from "element-plus";
import { ElNotification } from "element-plus";
import "element-plus/es/components/notification/style/css";
import "element-plus/es/components/notification/style/index";

export const cdNotify = (options?: NotificationParams) => {
  if (!options) {
    return;
  }
  // ts-ignore
  if (!options?.["title"]) {
    return;
  }

  ElNotification(Object.assign({ type: "success", position: "top-right", showClose: true }, options));
};

export const cdNotifySuccess = (title: string, options: NotificationParams = {}) => {
  cdNotify(Object.assign({}, options, { title, type: "success" }));
};

export const cdNotifyError = (title: string, options: NotificationParams = {}) => {
  cdNotify(Object.assign({}, options, { title, type: "error" }));
};

export const cdNotifyWarning = (title: string, options: NotificationParams = {}) => {
  cdNotify(Object.assign({}, options, { title, type: "warn" }));
};

export const cdNotifyInfo = (title: string, options: NotificationParams = {}) => {
  cdNotify(Object.assign({}, options, { title, type: "info" }));
};

export interface CdFeedbackProps {
  notify: Function;
  notifySuccess: typeof cdNotifySuccess;
  notifyError: Function;
  notifyWarning: Function;
  notifyInfo: Function;
}

export const CdFeedback: CdFeedbackProps = {
  notify: cdNotify,
  notifySuccess: cdNotifySuccess,
  notifyError: cdNotifyError,
  notifyWarning: cdNotifyWarning,
  notifyInfo: cdNotifyInfo
};
