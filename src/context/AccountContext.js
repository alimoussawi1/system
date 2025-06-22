import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const AccountContext = createContext();
toastr.options = {
    closeButton: true,
    progressBar: true,
    timeOut: 3000,
    positionClass: "toast-top-right",
    preventDuplicates: true,
};
export const AccountProvider = ({ children }) => {
    const [accountData, setAccountData] = useState(null);
    const [loading, setLoading] = useState(true);
    const showSuccessToast = (message) => {
        toastr.success(message, '', {
            iconClass: 'toast-success custom-success',
        });
    };

    const showErrorToast = (message) => {
        toastr.error(message, '', {
            iconClass: 'toast-error custom-error',
        });
    };
    const fetchActiveSubscription = async (uid) => {
        try {
            const subscriptionsRef = collection(db, "subscriptions");
            const q = query(
                subscriptionsRef,
                where("businessUid", "==", uid),
                where("status", "==", true),
                orderBy("endDate", "desc"),
                limit(1)
            );
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const activeSub = snapshot.docs[0].data();
                const endDate = activeSub.endDate.toDate();
                const planName = activeSub.packageName;

                // Calculate timeLeft immediately
                const now = new Date();
                const timeDiff = endDate - now;
                let timeLeft = null;

                if (timeDiff > 0) {
                    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

                    timeLeft = `${days}d `;
                }

                setAccountData(prev => ({
                    ...prev,
                    plan: planName,
                    access: true,
                    timeLeft,
                }));
            } else {
                setAccountData(prev => ({
                    ...prev,
                    access: false,
                    timeLeft: "No active subscription found",
                }));
            }
        } catch (error) {
            console.error("Error fetching active subscription:", error);
        }
    };
    useEffect(() => {
        if (accountData?.uid) {
            fetchActiveSubscription(accountData.uid);
        }
    }, [accountData?.uid]);

    useEffect(() => {
        const storedSession = localStorage.getItem("accountSession");

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user && storedSession) {
                const parsed = JSON.parse(storedSession);
                try {
                    const token = await user.getIdToken();
                    const userRef = doc(db, "users", parsed.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        const role = userData.email === "amoussawi02@gmail.com"
                            ? "admin"
                            : userData.businessName
                                ? "business"
                                : "student";

                        if (role === "student") {
                            setAccountData(null);
                            setLoading(false);
                            return;
                        }

                        setAccountData({
                            uid: parsed.uid,
                            token,
                            role,
                            fullName: userData.businessName || userData.fullName,
                            plan: userData.plan || null,
                            isAdmin: role === "admin",
                        });
                    } else {
                        setAccountData(null);
                    }
                } catch (err) {
                    console.error("Error refetching session data:", err);
                    setAccountData(null);
                }
            } else {
                setAccountData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <style>
                {`
  /* SUCCESS TOAST */
  .toast-success.custom-success {
    background-color: white !important;
    color: #5842aa !important;
    border-left: 6px solid #7e22ce !important;
    box-shadow: 0 8px 20px rgba(126, 34, 206, 0.15) !important;
    border-radius: 8px !important;
    padding: 16px !important;
    backdrop-filter: none !important;       /* removes any blur */
    -webkit-backdrop-filter: none !important;
    opacity: 1 !important;                  /* fully opaque */
  }

  .toast-success.custom-success .toast-message {
    color: #7e22ce !important;
    font-weight: 600 !important;
    font-size: 16px !important;
  }

  .toast-success.custom-success::before {
    color: #7e22ce !important;
    font-size: 20px !important;
  }

  .toast-success .toast-progress {
    background-color: #7e22ce !important;
    height: 4px !important;
  }

  /* ERROR TOAST */
  .toast-error.custom-error {
    background-color: white !important;
    color: #b91c1c !important;
    border-left: 6px solid #f87171 !important; /* Light red */
    box-shadow: 0 8px 20px rgba(239, 68, 68, 0.1) !important;
    border-radius: 8px !important;
    padding: 16px !important;
  }

  .toast-error.custom-error .toast-message {
    color: #b91c1c !important;
    font-weight: 600 !important;
    font-size: 16px !important;
  }

  .toast-error.custom-error::before {
    color: #ef4444 !important;
    font-size: 20px !important;
  }

  .toast-error .toast-progress {
    background-color: #ef4444 !important; /* Red progress bar */
    height: 4px !important;
  }
`}
            </style>



            <AccountContext.Provider value={{ accountData, setAccountData, loading, showSuccessToast, showErrorToast }}>
                {children}
            </AccountContext.Provider>
        </>
    );

};

export const useAccount = () => useContext(AccountContext);
