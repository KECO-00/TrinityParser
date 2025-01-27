import React, { useEffect, useState } from "react";
import '../styles/Board.css';

export interface IGradePageProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export interface BoardType {
    id: string;
    context: string;
    created_time: string;
    visible: string;
    likes: string;
    total_records: string;
}

export interface BoardEntry {
    status: string;
    message: string;
    data: BoardType[];
}

const BoardPage: React.FC<IGradePageProps> = (props) => {
    const api_url = import.meta.env.VITE_API_URL;
    const [boardList, setBoardList] = useState<BoardType[]>();

    useEffect(() => {
        const getBoard = async () => {
            try {
                const res = await fetch(`${api_url}/trinity/auth/vl?cursor={}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                const data: BoardEntry = await res.json();
                if(data.status === "Bad Request"){
                    alert(data.message);
                }
                setBoardList(data.data);
            }catch(err) {

            }
        }

        getBoard();
    }, []);


    return (
        <>
            <div className="guestbook-container">
                <h1 className="guestbook-title">방명록</h1>
                <div className="entries-container">
                <div className="entry-card">
                    <p className="entry-id">#1</p>
                    <p className="entry-context">방명록 내용</p>
                    <div className="entry-footer">
                        <span className="entry-date">날짜</span>
                        <span className="entry-likes">❤️ 좋아요</span>
                    </div>
                </div>
                <div className="entry-card">
                    <p className="entry-id">#1</p>
                    <p className="entry-context">방명록 내용</p>
                    <div className="entry-footer">
                        <span className="entry-date">날짜</span>
                        <span className="entry-likes">❤️ 좋아요</span>
                    </div>
                </div>
                <div className="entry-card">
                    <p className="entry-id">#1</p>
                    <p className="entry-context">방명록 내용</p>
                    <div className="entry-footer">
                        <span className="entry-date">날짜</span>
                        <span className="entry-likes">❤️ 좋아요</span>
                    </div>
                </div>
                <div className="entry-card">
                    <p className="entry-id">#1</p>
                    <p className="entry-context">방명록 내용</p>
                    <div className="entry-footer">
                        <span className="entry-date">날짜</span>
                        <span className="entry-likes">❤️ 좋아요</span>
                    </div>
                </div>
                <div className="entry-card">
                    <p className="entry-id">#1</p>
                    <p className="entry-context">방명록 내용</p>
                    <div className="entry-footer">
                        <span className="entry-date">날짜</span>
                        <span className="entry-likes">❤️ 좋아요</span>
                    </div>
                </div>
                <div className="entry-card">
                    <p className="entry-id">#1</p>
                    <p className="entry-context">방명록 내용</p>
                    <div className="entry-footer">
                        <span className="entry-date">날짜</span>
                        <span className="entry-likes">❤️ 좋아요</span>
                    </div>
                </div>
                    
                </div>
            </div>
        </>
    )
}

export default BoardPage;