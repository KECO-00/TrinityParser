import * as React from 'react';
import '../styles/Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>CUKProject001</p>
        <a href="/privacy">개인정보방침</a>
        <p>개발자: 
        <a href="https://github.com/1876070677" target="_blank" rel="noopener noreferrer">1876070677, </a>
        <a href="https://github.com/KECO-00" target="_blank" rel="noopener noreferrer">KECO-00</a>
        </p>
        <p>문의: trinityparser@dobby.kr</p>
        <p>오픈소스: <a href="https://github.com/1876070677/TrinityParser2024" target="_blank" rel="noopener noreferrer">https://github.com/1876070677/TrinityParser2024</a> </p>
        <hr />
        <p>Copyright 2024. 1876070677, KECO-00 All rights reserved.</p>
      </div>

    </footer>
  );
}
