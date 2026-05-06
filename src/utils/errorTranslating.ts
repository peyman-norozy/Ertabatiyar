import { t } from "i18next";

const errorObj = {
    SETADMIN: t('errorSMS.SETADMIN'),
    wrong_password: t('errorSMS.wrong_password'),
    access_denied: t('errorSMS.access_denied')
}

type ErrorKeys = keyof typeof errorObj;


export const errorFun=(errText:ErrorKeys)=>{
return errorObj[errText]
}