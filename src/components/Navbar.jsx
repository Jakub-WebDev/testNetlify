import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../assets/Logo.png";
import CustomSelect from "../components/CustomSelect";

export default function Navbar() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <nav>
      <div className={styles.bar}>
        <div className={styles.barPart}>
          <a href="mailto:mhhasanul@gmail.com">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9 2H3.1C2.54305 2 2.0089 2.23705 1.61508 2.65901C1.22125 3.08097 1 3.65326 1 4.25V11.75C1 12.3467 1.22125 12.919 1.61508 13.341C2.0089 13.7629 2.54305 14 3.1 14H12.9C13.457 14 13.9911 13.7629 14.3849 13.341C14.7788 12.919 15 12.3467 15 11.75V4.25C15 3.65326 14.7788 3.08097 14.3849 2.65901C13.9911 2.23705 13.457 2 12.9 2ZM3.1 3.5H12.9C13.0857 3.5 13.2637 3.57902 13.395 3.71967C13.5263 3.86032 13.6 4.05109 13.6 4.25L8 7.91L2.4 4.25C2.4 4.05109 2.47375 3.86032 2.60503 3.71967C2.7363 3.57902 2.91435 3.5 3.1 3.5ZM13.6 11.75C13.6 11.9489 13.5263 12.1397 13.395 12.2803C13.2637 12.421 13.0857 12.5 12.9 12.5H3.1C2.91435 12.5 2.7363 12.421 2.60503 12.2803C2.47375 12.1397 2.4 11.9489 2.4 11.75V5.96L7.636 9.3875C7.74241 9.45333 7.86312 9.48798 7.986 9.48798C8.10888 9.48798 8.22959 9.45333 8.336 9.3875L13.6 5.96V11.75Z"
                fill="#ffffff"
              />
            </svg>
            mhhasanul@gmail.com
          </a>
          <a href="tel:123-456-7890">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1967 15H11.2164C11.586 15 11.9353 14.8544 12.1999 14.5898L14.0984 12.6913C14.1634 12.6263 14.215 12.5492 14.2503 12.4643C14.2855 12.3793 14.3036 12.2883 14.3036 12.1964C14.3036 12.1044 14.2855 12.0134 14.2503 11.9285C14.215 11.8435 14.1634 11.7664 14.0984 11.7014L11.2983 8.90129C11.2333 8.83623 11.1562 8.78461 11.0712 8.74939C10.9863 8.71417 10.8953 8.69604 10.8033 8.69604C10.7114 8.69604 10.6204 8.71417 10.5354 8.74939C10.4505 8.78461 10.3734 8.83623 10.3084 8.90129L9.19257 10.0171C8.67525 9.86314 7.70991 9.51313 7.09809 8.90129C6.48627 8.28946 6.13625 7.32412 5.98225 6.80679L7.09809 5.69093C7.16315 5.62598 7.21477 5.54883 7.24999 5.46391C7.28521 5.37898 7.30334 5.28795 7.30334 5.19601C7.30334 5.10407 7.28521 5.01304 7.24999 4.92811C7.21477 4.84319 7.16315 4.76604 7.09809 4.70109L4.29798 1.90094C4.16415 1.77463 3.98709 1.70426 3.80306 1.70426C3.61903 1.70426 3.44197 1.77463 3.30814 1.90094L1.41037 3.79944C1.14436 4.06545 0.994551 4.43087 1.00015 4.80399C1.01625 5.80084 1.28016 9.26321 4.00887 11.9919C6.73758 14.7207 10.1999 14.9839 11.1967 15ZM3.80376 3.38572L5.61403 5.19601L4.7089 6.10115C4.62653 6.1833 4.56602 6.28474 4.53288 6.39625C4.49975 6.50776 4.49504 6.62579 4.51919 6.73959C4.53599 6.82009 4.94691 8.72909 6.10895 9.89114C7.271 11.0532 9.17997 11.4641 9.26047 11.4809C9.37426 11.5052 9.49233 11.5006 9.60386 11.4674C9.71539 11.4343 9.81683 11.3737 9.8989 11.2912L10.804 10.3861L12.6143 12.1964L11.21 13.5999C10.3364 13.5852 7.3473 13.3507 4.99871 11.0014C2.64242 8.64508 2.41421 5.64543 2.40021 4.78929L3.80376 3.38572ZM13.5999 7.29961H15C15 3.70844 12.2888 1 8.69275 1V2.40007C11.5363 2.40007 13.5999 4.46027 13.5999 7.29961Z"
                fill="#ffffff"
              />
              <path
                d="M9.5 4.12187V3.52039C10.4424 3.60006 11.1376 3.90971 11.6139 4.38605C12.0903 4.8624 12.3999 5.55761 12.4796 6.5H11.8781C11.8151 5.8192 11.6097 5.24081 11.1845 4.81555C10.7592 4.39029 10.1808 4.18491 9.5 4.12187Z"
                stroke="#ffffff"
              />
            </svg>
            (12345)67890
          </a>
        </div>
        <div className={styles.barPart}>
          <CustomSelect option1="English" option2="Polish" option3="Spanish" />
          <CustomSelect option1="USD" option2="PLN" option3="EUR" />
          <a href="#">
            Login
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2C8.49445 2 8.9778 2.14662 9.38893 2.42133C9.80005 2.69603 10.1205 3.08648 10.3097 3.54329C10.4989 4.00011 10.5484 4.50277 10.452 4.98773C10.3555 5.47268 10.1174 5.91814 9.76777 6.26777C9.41814 6.6174 8.97268 6.8555 8.48773 6.95196C8.00278 7.04843 7.50011 6.99892 7.04329 6.8097C6.58648 6.62048 6.19603 6.30005 5.92133 5.88893C5.64662 5.4778 5.5 4.99445 5.5 4.5C5.5 3.83696 5.76339 3.20107 6.23223 2.73223C6.70108 2.26339 7.33696 2 8 2ZM8 1C7.30777 1 6.63108 1.20527 6.05551 1.58986C5.47993 1.97444 5.03133 2.52107 4.76642 3.16061C4.50152 3.80015 4.4322 4.50388 4.56725 5.18282C4.7023 5.86175 5.03564 6.48539 5.52513 6.97487C6.01461 7.46436 6.63825 7.7977 7.31719 7.93275C7.99612 8.0678 8.69985 7.99848 9.33939 7.73358C9.97893 7.46867 10.5256 7.02007 10.9101 6.4445C11.2947 5.86892 11.5 5.19223 11.5 4.5C11.5 3.57174 11.1313 2.6815 10.4749 2.02513C9.8185 1.36875 8.92826 1 8 1Z"
                fill="#ffffff"
              />
              <path
                d="M13 15H12V12.5C12 12.1717 11.9353 11.8466 11.8097 11.5433C11.6841 11.24 11.4999 10.9644 11.2678 10.7322C11.0356 10.5001 10.76 10.3159 10.4567 10.1903C10.1534 10.0647 9.8283 10 9.5 10H6.5C5.83696 10 5.20107 10.2634 4.73223 10.7322C4.26339 11.2011 4 11.837 4 12.5V15H3V12.5C3 11.5717 3.36875 10.6815 4.02513 10.0251C4.6815 9.36875 5.57174 9 6.5 9H9.5C10.4283 9 11.3185 9.36875 11.9749 10.0251C12.6313 10.6815 13 11.5717 13 12.5V15Z"
                fill="#ffffff"
              />
            </svg>
          </a>
          <Link to="/favourites">
            Wishlist
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7141 3.30182C12.9713 2.55413 11.9865 2.09955 10.9387 2.02074C9.89102 1.94192 8.84997 2.24411 8.00494 2.87236C7.11474 2.20608 6.00672 1.90396 4.90401 2.02683C3.80131 2.1497 2.78582 2.68844 2.06205 3.53456C1.33828 4.38068 0.959991 5.47133 1.00336 6.58688C1.04672 7.70243 1.50852 8.76001 2.29576 9.54665L7.50818 14.7917C7.57323 14.8577 7.65061 14.9101 7.73587 14.9459C7.82113 14.9816 7.91257 15 8.00494 15C8.0973 15 8.18875 14.9816 8.27401 14.9459C8.35927 14.9101 8.43665 14.8577 8.50169 14.7917L13.7141 9.54665C14.1218 9.13671 14.4452 8.64995 14.6658 8.11419C14.8864 7.57843 15 7.00418 15 6.42424C15 5.8443 14.8864 5.27004 14.6658 4.73428C14.4452 4.19852 14.1218 3.71177 13.7141 3.30182ZM12.7276 8.55396L8.00494 13.2992L3.28227 8.55396C2.8661 8.13343 2.5826 7.59861 2.46733 7.01657C2.35207 6.43454 2.41017 5.83121 2.63436 5.28228C2.85854 4.73335 3.23882 4.26325 3.72749 3.93097C4.21616 3.59868 4.79147 3.419 5.38123 3.41447C6.16912 3.41641 6.92404 3.73293 7.4802 4.29452C7.54524 4.3605 7.62262 4.41288 7.70788 4.44862C7.79314 4.48437 7.88459 4.50277 7.97695 4.50277C8.06931 4.50277 8.16076 4.48437 8.24602 4.44862C8.33128 4.41288 8.40866 4.3605 8.47371 4.29452C9.04625 3.79527 9.7859 3.53355 10.543 3.56233C11.3 3.59111 12.0179 3.90824 12.5514 4.44954C13.0849 4.99083 13.3941 5.71586 13.4164 6.47788C13.4387 7.23989 13.1725 7.98199 12.6716 8.55396H12.7276Z"
                fill="#ffffff"
              />
            </svg>
          </Link>
          <Link to="/cart">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.999023 1.59916C0.999023 1.44001 1.06225 1.28738 1.17478 1.17484C1.28732 1.06231 1.43995 0.999084 1.5991 0.999084H2.04556C2.80566 0.999084 3.26172 1.51035 3.52175 1.98561C3.69538 2.30245 3.82099 2.6697 3.91941 3.00255C3.94602 3.00045 3.97271 2.99938 3.99942 2.99935H13.9991C14.6632 2.99935 15.1433 3.63463 14.9608 4.27391L13.4983 9.40178C13.3671 9.86173 13.0897 10.2664 12.708 10.5546C12.3263 10.8427 11.8611 10.9987 11.3828 10.9988H6.62376C6.14169 10.9988 5.67296 10.8405 5.2896 10.5482C4.90625 10.2559 4.6295 9.84585 4.50188 9.38098L3.8938 7.16309L2.88567 3.76425L2.88487 3.75785C2.76005 3.30419 2.64324 2.87933 2.46882 2.56249C2.30159 2.25445 2.16718 2.19924 2.04636 2.19924H1.5991C1.43995 2.19924 1.28732 2.13602 1.17478 2.02348C1.06225 1.91095 0.999023 1.75831 0.999023 1.59916ZM5.05795 6.87185L5.65883 9.06334C5.77885 9.497 6.1733 9.79864 6.62376 9.79864H11.3828C11.6002 9.79863 11.8116 9.7278 11.9852 9.59685C12.1587 9.46591 12.2849 9.28199 12.3445 9.07294L13.7343 4.1995H4.26745L5.04675 6.82945L5.05795 6.87185Z"
                fill="#ffffff"
              />
              <path
                d="M7.80003 13.4007C7.80003 13.8251 7.63143 14.2322 7.33134 14.5323C7.03124 14.8324 6.62422 15.001 6.19982 15.001C5.77542 15.001 5.3684 14.8324 5.0683 14.5323C4.7682 14.2322 4.59961 13.8251 4.59961 13.4007C4.59961 12.9763 4.7682 12.5693 5.0683 12.2692C5.3684 11.9691 5.77542 11.8005 6.19982 11.8005C6.62422 11.8005 7.03124 11.9691 7.33134 12.2692C7.63143 12.5693 7.80003 12.9763 7.80003 13.4007ZM6.59987 13.4007C6.59987 13.2946 6.55772 13.1929 6.4827 13.1179C6.40767 13.0428 6.30592 13.0007 6.19982 13.0007C6.09372 13.0007 5.99196 13.0428 5.91694 13.1179C5.84191 13.1929 5.79977 13.2946 5.79977 13.4007C5.79977 13.5068 5.84191 13.6086 5.91694 13.6836C5.99196 13.7587 6.09372 13.8008 6.19982 13.8008C6.30592 13.8008 6.40767 13.7587 6.4827 13.6836C6.55772 13.6086 6.59987 13.5068 6.59987 13.4007Z"
                fill="#ffffff"
              />
              <path
                d="M13.4006 13.4007C13.4006 13.8251 13.232 14.2322 12.9319 14.5323C12.6318 14.8324 12.2248 15.001 11.8004 15.001C11.376 15.001 10.969 14.8324 10.6689 14.5323C10.3688 14.2322 10.2002 13.8251 10.2002 13.4007C10.2002 12.9763 10.3688 12.5693 10.6689 12.2692C10.969 11.9691 11.376 11.8005 11.8004 11.8005C12.2248 11.8005 12.6318 11.9691 12.9319 12.2692C13.232 12.5693 13.4006 12.9763 13.4006 13.4007ZM12.2005 13.4007C12.2005 13.2946 12.1583 13.1929 12.0833 13.1179C12.0083 13.0428 11.9065 13.0007 11.8004 13.0007C11.6943 13.0007 11.5925 13.0428 11.5175 13.1179C11.4425 13.1929 11.4004 13.2946 11.4004 13.4007C11.4004 13.5068 11.4425 13.6086 11.5175 13.6836C11.5925 13.7587 11.6943 13.8008 11.8004 13.8008C11.9065 13.8008 12.0083 13.7587 12.0833 13.6836C12.1583 13.6086 12.2005 13.5068 12.2005 13.4007Z"
                fill="#ffffff"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className={styles.navigation}>
        <Link className={styles.navLogo} to="/">
          <img src={logo} alt="Hekto logo" />
        </Link>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#FB2E86" : "#101750",
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          style={({ isActive }) => ({
            color: isActive ? "#FB2E86" : "#101750",
          })}
        >
          Products
        </NavLink>
        <a href="#blog">Blog</a>
        <a href="#">Contact</a>
        <form className={styles.navForm}>
          <input type="text" className={styles.navInput} placeholder="Search" />
          <button
            onClick={handleSubmit}
            className={styles.navButton}
            type="submit"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8315 12.9884L11.6068 10.78C12.4704 9.70246 12.8886 8.33476 12.7754 6.95814C12.6623 5.58151 12.0264 4.30059 10.9985 3.37875C9.97062 2.45692 8.62888 1.96424 7.24917 2.00202C5.86946 2.03981 4.55665 2.60518 3.58069 3.58189C2.60472 4.5586 2.03978 5.8724 2.00202 7.25316C1.96427 8.63392 2.45657 9.97668 3.37771 11.0053C4.29884 12.034 5.57879 12.6704 6.95437 12.7836C8.32996 12.8968 9.69661 12.4783 10.7733 11.6141L12.98 13.8225C13.0358 13.8787 13.1021 13.9234 13.1752 13.9538C13.2482 13.9843 13.3266 14 13.4058 14C13.4849 14 13.5633 13.9843 13.6364 13.9538C13.7094 13.9234 13.7758 13.8787 13.8315 13.8225C13.9396 13.7106 14 13.5611 14 13.4054C14 13.2498 13.9396 13.1003 13.8315 12.9884ZM7.40932 11.6141C6.57914 11.6141 5.76759 11.3678 5.07732 10.9062C4.38704 10.4446 3.84904 9.78855 3.53134 9.02097C3.21364 8.25339 3.13051 7.40877 3.29247 6.59392C3.45444 5.77906 3.85421 5.03057 4.44124 4.4431C5.02827 3.85562 5.7762 3.45554 6.59043 3.29346C7.40467 3.13137 8.24865 3.21456 9.01564 3.5325C9.78263 3.85044 10.4382 4.38885 10.8994 5.07965C11.3607 5.77045 11.6068 6.58262 11.6068 7.41343C11.6068 8.52753 11.1646 9.59599 10.3774 10.3838C9.59022 11.1716 8.52257 11.6141 7.40932 11.6141Z"
                fill="#ffffff"
              />
            </svg>
          </button>
        </form>
      </div>
    </nav>
  );
}
