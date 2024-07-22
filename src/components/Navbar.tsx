import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { FaHome, FaPencilAlt, FaBook } from "react-icons/fa";


export default function Navbar () {

  const curLocation: string = useLocation().pathname;


  return (
    <div className="navbar">
      <Link to="/" className="nav">
        <nav className={
          curLocation === "/"
          ? "active-nav-item"
          : "nav-item"
        }>
            <span><FaHome/></span>
            홈
        </nav>
      </Link>
      <Link to="/sugang" className="nav">
        <nav className={
          curLocation === "/sugang"
          ? "active-nav-item"
          : "nav-item"
        }>
            <span><FaBook/></span>
            수강 신청 인원 조회
        </nav>
      </Link>
      <Link to="/grade" className="nav">
        <nav className={
          curLocation === "/grade"
          ? "active-nav-item"
          : "nav-item"
        }>
            <span><FaPencilAlt/></span>
            성적 조회
        </nav>
      </Link>
    </div>
  );
}
