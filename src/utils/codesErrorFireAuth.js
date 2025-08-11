// Firebase Auth Error Codes with Arabic Translations
export const firebaseAuthErrors = {
  // Authentication Errors
  "auth/user-not-found": {
    code: "auth/user-not-found",
    message: "هذا البريد الإلكتروني غير مسجل في النظام",
    arabic: "هذا البريد الإلكتروني غير مسجل في النظام"
  },
  "auth/wrong-password": {
    code: "auth/wrong-password",
    message: "كلمة المرور غير صحيحة",
    arabic: "كلمة المرور غير صحيحة"
  },
  "auth/invalid-email": {
    code: "auth/invalid-email",
    message: "صيغة البريد الإلكتروني غير صحيحة",
    arabic: "صيغة البريد الإلكتروني غير صحيحة"
  },
  "auth/user-disabled": {
    code: "auth/user-disabled",
    message: "تم تعطيل هذا الحساب من قبل المسؤول",
    arabic: "تم تعطيل هذا الحساب من قبل المسؤول"
  },
  "auth/too-many-requests": {
    code: "auth/too-many-requests",
    message: "تم تجاوز الحد الأقصى للمحاولات. يرجى المحاولة لاحقاً",
    arabic: "تم تجاوز الحد الأقصى للمحاولات. يرجى المحاولة لاحقاً"
  },
  "auth/operation-not-allowed": {
    code: "auth/operation-not-allowed",
    message: "هذه العملية غير مسموح بها",
    arabic: "هذه العملية غير مسموح بها"
  },
  "auth/email-already-in-use": {
    code: "auth/email-already-in-use",
    message: "البريد الإلكتروني مستخدم بالفعل",
    arabic: "البريد الإلكتروني مستخدم بالفعل"
  },
  "auth/weak-password": {
    code: "auth/weak-password",
    message: "كلمة المرور ضعيفة جداً. يجب أن تكون 6 أحرف على الأقل",
    arabic: "كلمة المرور ضعيفة جداً. يجب أن تكون 6 أحرف على الأقل"
  },
  "auth/invalid-credential": {
    code: "auth/invalid-credential",
    message: "بيانات الاعتماد غير صحيحة",
    arabic: "بيانات الاعتماد غير صحيحة"
  },
  "auth/account-exists-with-different-credential": {
    code: "auth/account-exists-with-different-credential",
    message: "يوجد حساب بنفس البريد الإلكتروني ولكن ببيانات اعتماد مختلفة",
    arabic: "يوجد حساب بنفس البريد الإلكتروني ولكن ببيانات اعتماد مختلفة"
  },
  "auth/requires-recent-login": {
    code: "auth/requires-recent-login",
    message: "هذه العملية تتطلب تسجيل دخول حديث",
    arabic: "هذه العملية تتطلب تسجيل دخول حديث"
  },
  "auth/credential-already-in-use": {
    code: "auth/credential-already-in-use",
    message: "بيانات الاعتماد مستخدمة بالفعل من قبل حساب آخر",
    arabic: "بيانات الاعتماد مستخدمة بالفعل من قبل حساب آخر"
  },
  "auth/invalid-verification-code": {
    code: "auth/invalid-verification-code",
    message: "رمز التحقق غير صحيح",
    arabic: "رمز التحقق غير صحيح"
  },
  "auth/invalid-verification-id": {
    code: "auth/invalid-verification-id",
    message: "معرف التحقق غير صحيح",
    arabic: "معرف التحقق غير صحيح"
  },
  "auth/missing-verification-code": {
    code: "auth/missing-verification-code",
    message: "رمز التحقق مطلوب",
    arabic: "رمز التحقق مطلوب"
  },
  "auth/missing-verification-id": {
    code: "auth/missing-verification-id",
    message: "معرف التحقق مطلوب",
    arabic: "معرف التحقق مطلوب"
  },
  "auth/quota-exceeded": {
    code: "auth/quota-exceeded",
    message: "تم تجاوز الحد الأقصى المسموح به",
    arabic: "تم تجاوز الحد الأقصى المسموح به"
  },
  "auth/app-not-authorized": {
    code: "auth/app-not-authorized",
    message: "التطبيق غير مصرح له",
    arabic: "التطبيق غير مصرح له"
  },
  "auth/network-request-failed": {
    code: "auth/network-request-failed",
    message: "فشل في طلب الشبكة. تحقق من اتصال الإنترنت",
    arabic: "فشل في طلب الشبكة. تحقق من اتصال الإنترنت"
  },
  "auth/internal-error": {
    code: "auth/internal-error",
    message: "حدث خطأ داخلي. يرجى المحاولة مرة أخرى",
    arabic: "حدث خطأ داخلي. يرجى المحاولة مرة أخرى"
  },
  "auth/invalid-app-credential": {
    code: "auth/invalid-app-credential",
    message: "بيانات اعتماد التطبيق غير صحيحة",
    arabic: "بيانات اعتماد التطبيق غير صحيحة"
  },
  "auth/invalid-app-id": {
    code: "auth/invalid-app-id",
    message: "معرف التطبيق غير صحيح",
    arabic: "معرف التطبيق غير صحيح"
  },
  "auth/invalid-user-token": {
    code: "auth/invalid-user-token",
    message: "رمز المستخدم غير صحيح",
    arabic: "رمز المستخدم غير صحيح"
  },
  "auth/invalid-tenant-id": {
    code: "auth/invalid-tenant-id",
    message: "معرف المستأجر غير صحيح",
    arabic: "معرف المستأجر غير صحيح"
  },
  "auth/unauthorized-domain": {
    code: "auth/unauthorized-domain",
    message: "النطاق غير مصرح له",
    arabic: "النطاق غير مصرح له"
  },
  "auth/unsupported-persistence-type": {
    code: "auth/unsupported-persistence-type",
    message: "نوع الاستمرارية غير مدعوم",
    arabic: "نوع الاستمرارية غير مدعوم"
  },
  "auth/user-token-expired": {
    code: "auth/user-token-expired",
    message: "انتهت صلاحية رمز المستخدم",
    arabic: "انتهت صلاحية رمز المستخدم"
  },
  "auth/web-storage-unsupported": {
    code: "auth/web-storage-unsupported",
    message: "تخزين الويب غير مدعوم",
    arabic: "تخزين الويب غير مدعوم"
  },
  "auth/popup-closed-by-user": {
    code: "auth/popup-closed-by-user",
    message: "تم إغلاق النافذة المنبثقة من قبل المستخدم",
    arabic: "تم إغلاق النافذة المنبثقة من قبل المستخدم"
  },
  "auth/popup-blocked": {
    code: "auth/popup-blocked",
    message: "تم حظر النافذة المنبثقة من قبل المتصفح",
    arabic: "تم حظر النافذة المنبثقة من قبل المتصفح"
  },
  "auth/cancelled-popup-request": {
    code: "auth/cancelled-popup-request",
    message: "تم إلغاء طلب النافذة المنبثقة",
    arabic: "تم إلغاء طلب النافذة المنبثقة"
  },
  "auth/popup-window-closed": {
    code: "auth/popup-window-closed",
    message: "تم إغلاق نافذة النافذة المنبثقة",
    arabic: "تم إغلاق نافذة النافذة المنبثقة"
  },
  "auth/redirect-cancelled-by-user": {
    code: "auth/redirect-cancelled-by-user",
    message: "تم إلغاء إعادة التوجيه من قبل المستخدم",
    arabic: "تم إلغاء إعادة التوجيه من قبل المستخدم"
  },
  "auth/redirect-operation-pending": {
    code: "auth/redirect-operation-pending",
    message: "عملية إعادة التوجيه معلقة",
    arabic: "عملية إعادة التوجيه معلقة"
  },
  "auth/timeout": {
    code: "auth/timeout",
    message: "انتهت مهلة العملية",
    arabic: "انتهت مهلة العملية"
  },
  "auth/invalid-phone-number": {
    code: "auth/invalid-phone-number",
    message: "رقم الهاتف غير صحيح",
    arabic: "رقم الهاتف غير صحيح"
  },
  "auth/missing-phone-number": {
    code: "auth/missing-phone-number",
    message: "رقم الهاتف مطلوب",
    arabic: "رقم الهاتف مطلوب"
  },
  "auth/quota-exceeded": {
    code: "auth/quota-exceeded",
    message: "تم تجاوز الحد الأقصى المسموح به",
    arabic: "تم تجاوز الحد الأقصى المسموح به"
  },
  "auth/invalid-recaptcha-token": {
    code: "auth/invalid-recaptcha-token",
    message: "رمز reCAPTCHA غير صحيح",
    arabic: "رمز reCAPTCHA غير صحيح"
  },
  "auth/missing-recaptcha-token": {
    code: "auth/missing-recaptcha-token",
    message: "رمز reCAPTCHA مطلوب",
    arabic: "رمز reCAPTCHA مطلوب"
  },
  "auth/invalid-recaptcha-action": {
    code: "auth/invalid-recaptcha-action",
    message: "إجراء reCAPTCHA غير صحيح",
    arabic: "إجراء reCAPTCHA غير صحيح"
  },
  "auth/missing-recaptcha-action": {
    code: "auth/missing-recaptcha-action",
    message: "إجراء reCAPTCHA مطلوب",
    arabic: "إجراء reCAPTCHA مطلوب"
  },
  "auth/invalid-recaptcha-score": {
    code: "auth/invalid-recaptcha-score",
    message: "درجة reCAPTCHA غير صحيحة",
    arabic: "درجة reCAPTCHA غير صحيحة"
  },
  "auth/missing-recaptcha-score": {
    code: "auth/missing-recaptcha-score",
    message: "درجة reCAPTCHA مطلوبة",
    arabic: "درجة reCAPTCHA مطلوبة"
  },
  "auth/invalid-recaptcha-token-type": {
    code: "auth/invalid-recaptcha-token-type",
    message: "نوع رمز reCAPTCHA غير صحيح",
    arabic: "نوع رمز reCAPTCHA غير صحيح"
  },
  "auth/missing-recaptcha-token-type": {
    code: "auth/missing-recaptcha-token-type",
    message: "نوع رمز reCAPTCHA مطلوب",
    arabic: "نوع رمز reCAPTCHA مطلوب"
  },
  "auth/invalid-recaptcha-token-version": {
    code: "auth/invalid-recaptcha-token-version",
    message: "إصدار رمز reCAPTCHA غير صحيح",
    arabic: "إصدار رمز reCAPTCHA غير صحيح"
  },
  "auth/missing-recaptcha-token-version": {
    code: "auth/missing-recaptcha-token-version",
    message: "إصدار رمز reCAPTCHA مطلوب",
    arabic: "إصدار رمز reCAPTCHA مطلوب"
  },
  "auth/invalid-recaptcha-token-action": {
    code: "auth/invalid-recaptcha-token-action",
    message: "إجراء رمز reCAPTCHA غير صحيح",
    arabic: "إجراء رمز reCAPTCHA غير صحيح"
  },
  "auth/missing-recaptcha-token-action": {
    code: "auth/missing-recaptcha-token-action",
    message: "إجراء رمز reCAPTCHA مطلوب",
    arabic: "إجراء رمز reCAPTCHA مطلوب"
  },
  "auth/invalid-recaptcha-token-score": {
    code: "auth/invalid-recaptcha-token-score",
    message: "درجة رمز reCAPTCHA غير صحيحة",
    arabic: "درجة رمز reCAPTCHA غير صحيحة"
  },
  "auth/missing-recaptcha-token-score": {
    code: "auth/missing-recaptcha-token-score",
    message: "درجة رمز reCAPTCHA مطلوبة",
    arabic: "درجة رمز reCAPTCHA مطلوبة"
  },
  "auth/invalid-recaptcha-token-type": {
    code: "auth/invalid-recaptcha-token-type",
    message: "نوع رمز reCAPTCHA غير صحيح",
    arabic: "نوع رمز reCAPTCHA غير صحيح"
  },
  "auth/missing-recaptcha-token-type": {
    code: "auth/missing-recaptcha-token-type",
    message: "نوع رمز reCAPTCHA مطلوب",
    arabic: "نوع رمز reCAPTCHA مطلوب"
  },
  "auth/invalid-recaptcha-token-version": {
    code: "auth/invalid-recaptcha-token-version",
    message: "إصدار رمز reCAPTCHA غير صحيح",
    arabic: "إصدار رمز reCAPTCHA غير صحيح"
  },
  "auth/missing-recaptcha-token-version": {
    code: "auth/missing-recaptcha-token-version",
    message: "إصدار رمز reCAPTCHA مطلوب",
    arabic: "إصدار رمز reCAPTCHA مطلوب"
  }
};

// Helper function to get error message by error code
export const getFirebaseAuthErrorMessage = (errorCode, language = 'arabic') => {
  const error = firebaseAuthErrors[errorCode];
  if (error) {
    return language === 'arabic' ? error.arabic : error.message;
  }
  return language === 'arabic' ? 'حدث خطأ غير متوقع. حاول مرة أخرى' : 'An unexpected error occurred. Please try again';
};

// Helper function to get error object by error code
export const getFirebaseAuthError = (errorCode) => {
  return firebaseAuthErrors[errorCode] || {
    code: errorCode,
    message: 'An unexpected error occurred. Please try again',
    arabic: 'حدث خطأ غير متوقع. حاول مرة أخرى'
  };
};

// Common error codes for quick access
export const COMMON_ERRORS = {
  USER_NOT_FOUND: "auth/user-not-found",
  WRONG_PASSWORD: "auth/wrong-password",
  INVALID_EMAIL: "auth/invalid-email",
  USER_DISABLED: "auth/user-disabled",
  TOO_MANY_REQUESTS: "auth/too-many-requests",
  EMAIL_ALREADY_IN_USE: "auth/email-already-in-use",
  WEAK_PASSWORD: "auth/weak-password",
  INVALID_CREDENTIAL: "auth/invalid-credential",
  NETWORK_ERROR: "auth/network-request-failed",
  INTERNAL_ERROR: "auth/internal-error"
};
