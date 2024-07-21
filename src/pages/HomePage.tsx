import React, { useEffect } from 'react';
import '../styles/Home.css';
import { useMovePage } from '../hooks/navigator';

export interface IHomepageProps {
  isLoggedIn: boolean,
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

interface LogoutResponse {
  status: string,
  message: string,
  data: null;
}

export default function Homepage (props: IHomepageProps) {
  const movePage = useMovePage();
  const api_url = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    const res = await fetch(`${api_url}/trinity/logout`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data: LogoutResponse = await res.json();

    if(data.status === "OK"){
      alert("로그아웃 되었습니다.");
      props.setLoggedIn(false);
    }

  }

  useEffect(() => {
    console.log(props.isLoggedIn);
  }, [])
  
  return (
    <>
      <div className="info-box">
        <p><strong>Trinity Parser</strong>는 트리니티의 데이터를 파싱해옵니다.</p>
        <p><strong>Trinity Parser</strong>가 제공하는 기능은 현재 두 가지가 있습니다.</p>
        <ol>
            <li>특정 교과목의 현재 수강 신청 인원과 수강 제한 인원을 확인할 수 있습니다.</li>
            <li>인스타에서 한 때 뜨거웠던 비공개 처리 되어있는 성적을 확인할 수 있습니다.</li>
        </ol>
        <p>사용자 수에 따라서 부가 기능이 개발될 수 있습니다.</p>
    </div>

      <div className="btn-container">
        <button className="btn-large" onClick={()=> movePage('/sugang')}>수강신청 인원 조회</button>
        <button className="btn-large" onClick={()=> movePage('/grade')}>이번 학기 성적 조회</button>
      </div>
      
      {
        props.isLoggedIn 
        ? <button className="btn-small" onClick={handleLogout}>로그아웃</button>
        : <button className="btn-small" onClick={()=> movePage('/login')}>로그인</button>
      }
    </>
  );
}
