import React, { useEffect, useState } from "react";
import '../styles/Board.css';

interface Response {
    status: string,
    message: string,
    data: null | string,
  }

export interface IGradePageProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export interface BoardType {
    id: string;
    context: string;
    created_time: string;
    visible: string;
    likes: number;
    total_records: string;
}

export interface BoardEntry {
    status: string;
    message: string;
    data: BoardType[];
}

const BoardPage: React.FC<IGradePageProps> = (props) => {
    const api_url = import.meta.env.VITE_API_URL;
    const [boardList, setBoardList] = useState<BoardType[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [lastId, setLastId] = useState<number>(0);

    const getBoard = async () => {
        try {
            const res = await fetch(`${api_url}/trinity/auth/vl?cursor=AaBbCcDdMA==`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'no-cors'
                },
                credentials: 'include',
            });

            const data: BoardEntry = await res.json();
            if(data.status === "Bad Request"){
                alert(data.message);
            }
            setBoardList(data.data);
        }catch(err) {
            alert("무엇인가 안된다")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지
        if (inputValue.trim() === "") {
          alert("내용을 입력해주세요!");
          return;
        }

        try {
            const res = await fetch(`${api_url}/trinity/auth/vl`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    context: inputValue,
                }),
                credentials: 'include',
            });

            const result: Response = await res.json();
            if(result.status === "Bad Request"){
                alert(`${result.message}`);
            } else {
                setInputValue(""); // 입력 필드 초기화
                alert("댓굴이 작성되었습니다.");
                getBoard();
            }
        }catch (err) {
            console.error(err);
        }
      };

      const handleLike = async (id:string) => {
        try {
            const targetEntry = boardList.find((entry) => entry.id === id);
            if(!targetEntry){
                console.error("해당 댓글을 찾을 수 없습니다.");
                return;
            }

            if(targetEntry.likes  >= 99) {
                alert("좋아요는 최대 99까지 가능합니다.");
                return;
            }
            const res = await fetch(`${api_url}/trinity/auth/vl/likes/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "mode": "no-cors"
                },
                credentials: "include",
            });

            if(!res) throw new Error("좋아요 요청 실패");

            setBoardList((prevBoardList) => 
                prevBoardList.map((entry) => 
                    entry.id === id ? { ...entry, likes: entry.likes + 1} : entry
                )
            );
        } catch (err) {
            console.error(err);
        }
      };

    useEffect(() => {
        getBoard();
        console.log(boardList);
        console.log(btoa("10"));
    }, []);
    console.log(boardList);
    
    const formatCreatedTime = (createdTime: string): string => {
        const createdDate = new Date(createdTime.replace(" ", "T"));
        const curTime = new Date();
        const timeDiff = curTime.getTime() - createdDate.getTime();

        const minutes = Math.floor(timeDiff / (1000 * 60));
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (minutes < 1){
            return "방금 전";
        } else if (minutes < 60){
            return `${minutes}분 전`;
        } else if (hours < 24) {
            return `${hours}시간 전`;
        } else {
            return `${days}일 전`;
        }
    };


    return (
        <>
            <div className="guestbook-container">
                <h1 className="guestbook-title">방명록</h1>
                <form onSubmit={handleSubmit} className="guestbook-form" >
                    <textarea 
                        placeholder="내용을 입력하세요..." 
                        className="guestbook-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} 
                    />
                    <button type="submit" className="guestbook-submit-btn">등록</button>
                </form>
                <div className="entries-container">
                    {boardList.map((entry) => (
                        <div key={entry.id} className="entry-card">
                            <p className="entry-context">{entry.context}</p>
                            <div className="entry-footer">
                                <span className="entry-date">{formatCreatedTime(entry.created_time)}</span>
                                <button className="like-btn" onClick={() => handleLike(entry.id)}>
                                    <span className="entry-likes" >❤️ {entry.likes}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        </>
    )
}

export default BoardPage;