import React, { useState } from 'react';
import "../styles/Sugang.css";
import { Loader } from '../components/Loader';
import { useMovePage } from '../hooks/navigator';

interface SugangResponse {
    status: string,
    message: string,
    data: {
        tlsnAplyRcnt: string | null,
        tlsnLmtRcnt: string | null,
        sbjtKorNm: string | null,
    } | null,
}

export interface ISugangPageProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SugangPage (props: ISugangPageProps) {
    const movePage = useMovePage();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [sbjtNo, setSbjtNo] = useState<string>('');
    const [classNo, setClassNo] = useState<string>('');

    const api_url = import.meta.env.VITE_API_URL;

    const [sbjtKorNm, setSbjtKorNm] = useState<string|null>('');
    const [tlsnAplyRcnt, setTlsnAplyRcnt] = useState<string|null>('');
    const [tlsnLmtRcnt, setTlsnLmtRcnt] = useState<string|null>('');

    const handleGetSugang = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`${api_url}/trinity/auth/sujtNo`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sujtNo: sbjtNo,
                    classNo: classNo
                }),
                credentials: 'include',
            });

            const data: SugangResponse = await res.json();
            if(data.status === "OK" && data.data) {
                setSbjtKorNm(data.data.sbjtKorNm);
                setTlsnAplyRcnt(data.data.tlsnAplyRcnt);
                setTlsnLmtRcnt(data.data.tlsnLmtRcnt);

                setIsLoading(false);
            } else if(data.status === "UNAUTHORIZED"){
                alert("로그인이 만료되었습니다.")
                props.setLoggedIn(false);
                movePage('/');
            } else {
                setIsError(true);
                setIsLoading(false);
            }


        } catch (err) {
            console.error("Error get Sugang", err);
        }
    }

    const resetStatus = () => {
        setSbjtNo('');
        setClassNo('');
    }

  return (
    <>
        <div className="search-form">
            <div className="input-container">
                <input 
                    type="text" 
                    name="subject-code" 
                    placeholder="과목 코드"
                    value={sbjtNo}
                    onChange={(e) => setSbjtNo(e.target.value)}
                />
                <input 
                    type="text" 
                    name="division" 
                    placeholder="분반" 
                    value={classNo}
                    onChange={(e) => setClassNo(e.target.value)}
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
                    ? <h4>과목코드 또는 분반이 유효하지 않습니다.</h4>
                    :
                    <>
                            <p>과목명: {sbjtKorNm}</p>
                            <p>과목 제한 인원: {tlsnLmtRcnt}</p>
                            <p>현재 신청 인원: {tlsnAplyRcnt}</p>
                        </>
                )
    
            }
        </div>
    </>
  );
}
