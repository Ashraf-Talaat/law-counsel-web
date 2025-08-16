"use client";
import { createContext, useContext, useState, useEffect } from "react";

//utils
import { getLawyerData } from "@/utils/getLawyerdate";

const LawyerContext = createContext();

export function LawyerProvider({ children }) {
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const lawyerId = localStorage.getItem("uid");
      if (!lawyerId) {
        setLoading(false); // حل مشكلة التعليق على اللودينج
        return;
      }

      try {
        const data = await getLawyerData(lawyerId);
        setLawyer(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, []);

  return (
    <LawyerContext.Provider value={{ lawyer, setLawyer, loading }}>
      {children}
    </LawyerContext.Provider>
  );
}

export function useLawyer() {
  return useContext(LawyerContext);
}
