import { t } from "i18next";

const errorObj = {
    SETADMIN: t('errorSMS.SETADMIN')
}

type ErrorKeys = keyof typeof errorObj;


export const errorFun=(errText:ErrorKeys)=>{
return errorObj[errText]
}