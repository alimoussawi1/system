import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const [accountData, setAccountData] = useState(null);
    const [loading, setLoading] = useState(true);
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
        <AccountContext.Provider value={{ accountData, setAccountData, loading }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => useContext(AccountContext);
