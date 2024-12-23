import * as React from 'react';
import { useState, useEffect } from 'react';
import "../styles/Grade.css";
import { useMovePage } from '../hooks/navigator';
import { Loader } from '../components/Loader';
import { Modal } from '../components/Modal';

interface Grade {
    details: string[];
    centesScorAdm: string;
    estiYn: string;
    grdAdm: string;
    sbjtKorNm: string;
    sbjtNo: string;
}

interface GradeResponse {
    status: string,
    message: string,
    data: {
        grades: Grade[],
    } | null
}

export interface IGradePageProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const GradePage: React.FC<IGradePageProps> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [grades, setGrades] = useState<Grade[]>([]);
    const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const api_url = import.meta.env.VITE_API_URL;
    const movePage = useMovePage();

    const handleGradeClick = (grade: Grade) => {
        setSelectedGrade(grade);
    };

    const closeModal = () => {
        setSelectedGrade(null);
    };

    useEffect(() => {
        const getGrade = async () => {
            setIsLoading(true);
            try{
                const res = await fetch(`${api_url}/trinity/auth/grade`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                const data: GradeResponse = await res.json();
                if(data.status === "UNAUTHORIZED"){
                    alert("로그인이 만료되었습니다.");
                    props.setLoggedIn(false);
                    movePage('/');
                } else if (data.data !== null) {
                    setGrades(data.data.grades);
                    setIsLoading(false);
                } else {
                    setErrorMsg("휴학생 또는 졸업생의 경우, 조회가 불가능합니다.")
                    setIsLoading(false);
                }
            } catch(err){
                
            }

        }

        getGrade();
        
    }, []);

    return (
        <>
            <h1>이번 학기 성적 조회</h1>

            <table className="grade-table">
                {
                    errorMsg !== ""
                    ? (<h4>{errorMsg}</h4>)
                    : (
                        isLoading
                        ? <Loader />
                        : (
                            <>
                                <thead>
                                    <tr>
                                        <th>과목명</th>
                                        <th>성적</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {grades.map((grade) => (
                                        <tr key={grade.sbjtNo} onClick={() => handleGradeClick(grade)}>
                                            <td>{grade.sbjtKorNm}</td>
                                            <td>{grade.grdAdm}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </>

                        )
                    )
                }
            </table>
            <p className="description">성적을 클릭하면 해당 과목의 세부 정보를 확인할 수 있습니다.</p>
            <Modal isOpen={selectedGrade !== null} onClose={closeModal}>
                {selectedGrade && (
                    <div>
                        <h2>{selectedGrade.sbjtKorNm}</h2>
                        <p>총점: {selectedGrade.centesScorAdm}</p>
                        <p>성적: {selectedGrade.grdAdm}</p>
                        <p>세부 점수:</p>
                        <ul>
                            {selectedGrade.details.map((detail, index) => (
                                <li key={index}>{detail}</li>
                            ))}
                        </ul>
                        <p>평가 여부: {selectedGrade.estiYn}</p>
                    </div>
                )}
            </Modal>

        </>
    );
};

export default GradePage;