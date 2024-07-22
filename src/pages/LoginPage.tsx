import React, { useState }from 'react';
import { useMovePage } from '../hooks/navigator';
import { SyncLoader } from "react-spinners";
import '../styles/Login.css';

interface Response {
  status: string,
  message: string,
  data: {
    name: string,
    roles: string[],
  } | null,
}
export interface ILoginPageProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LoginPage (props: ILoginPageProps) {
  const movePage = useMovePage();
  const api_url = import.meta.env.VITE_API_URL;

  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleLogin = async () => {
    setErrMsg('');
    setIsLoading(true);
    if(isChecked){
      try {
        const res = await fetch(`${api_url}/trinity/login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            trinityId: id,
            password: pw
          }),
          credentials: 'include',
        });
  
        const data: Response = await res.json();
  
        if(data.status === "OK" && data.data){
          props.setLoggedIn(true);
          setIsLoading(false);
          movePage('/');
        } else {
          setIsLoading(false);
          setErrMsg('유효하지 않은 로그인 정보입니다.');
        }
  
      } catch (err) {
        console.error("Error logging in:", err);
        setIsLoading(false);
        setErrMsg("로그인 중 오류가 발생했습니다.");
      }
    }else{
      alert("동의가 필요합니다")
    }

  };

  return (
      <div className="login-form">
            <div className="login-container">
                <input 
                  type="text" 
                  name="id" 
                  placeholder="TRINITY ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
                <input 
                  type="password" 
                  name="password" 
                  placeholder="PW" 
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                />
            </div>

            <div className="error-container">
              {
                isLoading 
                ? <SyncLoader color='white' />
                : errMsg
                // 
              }
            </div>

            <div className="policy-box">
              <span>
                TrinityParser를 원활하게 사용하기 위해서 개인정보
                수집 및 이용에 관한 동의를 받고자 합니다. 아래에서
                동의 여부를 선택해주세요.
              </span>
              <ol>
                <li>
                  <strong>수집 목적:</strong> 트리니티 사이트 로그인 맟 파싱을 위한 일시적 수집.
                </li>
                <li>
                  <strong>수집 항목:</strong> ID, Password, 이름, 학번 등.
                </li>
                <li>
                  <strong>보유 및 이용 기간:</strong> <br />
                  ⓐ ID 및 Password는 로그인 절차가 완료된 후 즉시 제거되며 저장하거나 기록되지 않습니다. <br />
                  ⓑ 그 외 정보는 트리니티로부터 수집하며 세션에 저장됩니다. 이 정보들은 세션이 만료되면 삭제되며 ID, Password와 마찬가지로 저장되거나 기록되지 않습니다. <br />
                </li>
              </ol>
            </div>
            <div className="checkbox-wrapper-65">
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span className="cbx">
                  <svg width="12px" height="11px" viewBox="0 0 12 11">
                    <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
                  </svg>
                </span>
                <span>네, 동의합니다</span>
              </label>
            </div>


            <button className="btn-small" onClick={handleLogin}>Login</button>
        </div>
  );
}
