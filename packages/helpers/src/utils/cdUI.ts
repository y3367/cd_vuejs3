import { ElNotification } from "element-plus";
import "element-plus/es/components/notification/style/css";
import "element-plus/es/components/notification/style/index";

export const cdNotify = (titleValue: string, typeValue: any = "success", positionValue: any = "top-right", showClose: boolean = true) => {
  ElNotification({
    title: titleValue,
    type: typeValue,
    position: positionValue,
    showClose: showClose
  });
};

export const cdNotifySuccess = (titleValue: string, positionValue: any = "top-right", showClose: boolean = true) => {
  cdNotify(titleValue, "success", positionValue, showClose);
};

export const cdNotifyError = (titleValue: string, positionValue: any = "top-right", showClose: boolean = true) => {
  cdNotify(titleValue, "error", positionValue, showClose);
};

export const cdNotifyWarning = (titleValue: string, positionValue: any = "top-right", showClose: boolean = true) => {
  cdNotify(titleValue, "warn", positionValue, showClose);
};

export const cdNotifyInfo = (titleValue: string, positionValue: any = "top-right", showClose: boolean = true) => {
  cdNotify(titleValue, "info", positionValue, showClose);
};
