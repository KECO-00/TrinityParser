import React, { useState } from 'react';
import "../styles/Sugang.css";
import { Loader } from '../components/Loader';
import { useMovePage } from '../hooks/navigator';

interface SugangResponse {
    status: string;
    message: string;
    data: {
        tlsnAplyRcnt: string | null;
        tlsnLmtRcnt: string | null;
        sbjtKorNm: string | null;
        classNo: string | null;
        extraCnt: string ;
    } | null;
}

export interface ISugangPageProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SugangPage (props: ISugangPageProps) {
    const movePage = useMovePage();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [sbjtNo, setSbjtNo] = useState<string>('');
    const [inputClassNo, setInputClassNo] = useState<string>('');

    const api_url = import.meta.env.VITE_API_URL;

    const [sbjtKorNm, setSbjtKorNm] = useState<string|null>('');
    const [classNo, setClassNo] = useState<string|null>('');
    const [tlsnAplyRcnt, setTlsnAplyRcnt] = useState<string|null>('');
    const [tlsnLmtRcnt, setTlsnLmtRcnt] = useState<string|null>('');
    const [extraCnt, setExtraCnt] = useState<string>('');

    const handleGetSugang = async () => {
        try {
            setIsError(false);
            setIsLoading(true);
            const res = await fetch(`${api_url}/trinity/auth/sujtInq?sujtNo=${sbjtNo}&classNo=${inputClassNo}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data: SugangResponse = await res.json();
            if(data.status === "OK" && data.data) {
                setSbjtKorNm(data.data.sbjtKorNm);
                setTlsnAplyRcnt(data.data.tlsnAplyRcnt);
                setTlsnLmtRcnt(data.data.tlsnLmtRcnt);
                setExtraCnt(data.data.extraCnt);
                setClassNo(data.data.classNo);

                setIsLoading(false);
            } else if(data.status === "UNAUTHORIZED"){
                alert("로그인이 만료되었습니다.")
                props.setLoggedIn(false);
                movePage('/');
            } else {
                setIsError(true);
                setErrorMsg(data.message);
                setIsLoading(false);
            }


        } catch (err) {
            console.error("Error get Sugang", err);
        }
    }

    const resetStatus = () => {
        setSbjtNo('');
        setInputClassNo('');
    }

  return (
    <>
        <div className="search-form">
            <div className="input-container">
                <input 
                    type="text" 
                    name="subject-code" 
                    placeholder="과목 코드 (예: 000000)"
                    value={sbjtNo}
                    onChange={(e) => setSbjtNo(e.target.value)}
                />
                <input 
                    type="text" 
                    name="division" 
                    placeholder="분반 (예: 01)" 
                    value={inputClassNo}
                    onChange={(e) => setInputClassNo(e.target.value)}
                />
            </div>

            <button className="btn-small" onClick={handleGetSugang}>Search</button>
            <button className="btn-small" onClick={resetStatus}>검색 초기화</button>
        </div>

        <div className="search-result">
            {
                isLoading
                ? <Loader />
                : (
                    isError
                    ? <h4>{errorMsg}</h4>
                    :
                    <>
                            <p>과목명: {sbjtKorNm} {classNo}</p>
                            <p>과목 제한 인원: {tlsnLmtRcnt}</p>
                            <p>현재 신청 인원: {tlsnAplyRcnt}</p>
                            <p>현재 여석 수: {extraCnt}</p>
                        </>
                )
    
            }
        </div>
    </>
  );
}
