import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { FaHome, FaPencilAlt, FaBook, FaClipboardList} from "react-icons/fa";


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
            수강인원 조회
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
      <Link to="/board" className="nav">
        <nav className={
          curLocation === '/board'
          ? "active-nav-item"
          : "nav-item"
        }>
          <span><FaClipboardList/></span>
          방명록
        </nav>
      </Link>
    </div>
  );
}
