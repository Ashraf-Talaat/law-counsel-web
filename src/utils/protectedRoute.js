



export default function ProtectedRoute({ children, pageType }) {
    // const router = useRouter();
    const user = (cookieStore.getItem('userType') || "").toLowerCase();
    const requiredType = pageType.toLowerCase();

        if (user !== requiredType) {
            switch (user) {
                case "client":
                    // router.push("/");
                    break;
                case "lawyer":
                    // router.push("/lawyer/home/articles");
                    break;
                default:
                    // router.push("/login");
                    break;
            }
            return
        }

   
    return children;
}


