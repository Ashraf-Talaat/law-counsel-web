import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { uploadToImageKit } from "./UploadImage";
import Swal from "sweetalert2";
import { uploadImage } from "./handleUrlImg";


export const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("الاسم مطلوب")
        .min(3, "يجب أن يحتوي على 3 حروف على الأقل"),
    email: Yup.string()
        .email("بريد إلكتروني غير صالح")
        .required("الإيميل مطلوب"),
    password: Yup.string()
        .required("كلمة المرور مطلوبة")
        .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    confirmPassword: Yup.string()
        .required("تأكيد كلمة المرور مطلوب")
        .oneOf([Yup.ref("password"), null], "كلمتا المرور غير متطابقتين"),
    phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
    dateOfBirth: Yup.string().required("تاريخ الميلاد مطلوب"),
    city: Yup.string().required("المدينة مطلوبة"),
    specializations: Yup.array()
        .min(1, "يجب اختيار تخصص واحد على الأقل")
        .of(Yup.string()),
    lawyerCard: Yup.mixed().required("صورة بطاقة المحاماة مطلوبة"),
    nationalId: Yup.mixed().required("صورة البطاقة الشخصية مطلوبة"),
});




export const handleLawyerRegister = async ({
    e,
    lawyerInputs,
    specializations,
    setErrors,
    router,
    setLoading,
    resetForm,
}) => {
    e.preventDefault();
    try {
        await validationSchema.validate(
            { ...lawyerInputs, specializations },
            { abortEarly: false }
        );
        setErrors({});


        const lawyerCardUrl = await uploadImage(lawyerInputs.lawyerCard);
        const nationalIdUrl = await uploadImage(lawyerInputs.nationalId);

        if (!lawyerCardUrl || !nationalIdUrl) {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'حدث خطأ',
                text: 'فشل رفع الملفات، تأكد من الصيغ والمحاولة مرة أخرى',
            })
            return ;
        }

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            lawyerInputs.email,
            lawyerInputs.password
        );

        const user = userCredential.user;

        


        await setDoc(doc(db, "lawyers",user.uid), {
            id: user.uid,
            name: lawyerInputs.name,
            email: lawyerInputs.email,
            phoneNumber: lawyerInputs.phoneNumber,
            birthDate: lawyerInputs.dateOfBirth,
            city: lawyerInputs.city,
            specializations: specializations,
            barAssociationImageUrl: lawyerCardUrl,
            idImageUrl: nationalIdUrl,
            isApproved: false,
            rating:0,
            aboutMe:null,
            achievements:null,
            balance: 0,
            feedback : [],
            price: 500,
            netPrice:450,

        });

        Swal.fire({
            icon: 'success',
            title: 'تم التسجيل بنجاح',
            text: 'يمكنك الآن تسجيل الدخول',

        }).then(() => {
            setLoading(true);
            router.push("/login");
        });

        if (resetForm) resetForm();

    } catch (err) {
        setLoading(false);
        // if (err.inner) {
        //     const formErrors = {};
        //     err.inner.forEach((error) => {
        //         formErrors[error.path] = error.message;
        //     });
        //     setErrors(formErrors);
        // } else {
            // alert("حدث خطأ: " + err.message);
            const errorMessage = getFirebaseAuthErrorMessage(err.code, 'arabic');
            Swal.fire({
                icon: 'error',
                title: 'حدث خطأ',
                text: errorMessage,

            })
        }
    // }
};