import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "./Auth";
import Logo from "/quizly-logo-big.svg";

const MainNavStyled = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  height: 8rem;
  background-color: ${({ theme }) => theme.colors.main};
  font-size: 2rem;

  /* position: relative; */
  overflow: hidden;

  img {
    height: 100%;
    padding: 0.5rem;
    margin: 0 1rem;
  }

  p {
    margin-right: 5rem;
  }

  ul {
    z-index: 10;
    /* overflow: hidden; */
    flex: 1;
    display: flex;
    list-style-type: none;
    color: white;
    height: 100%;

    li {
      /* overflow: hidden; */
      height: 100%;
      transition: all 0.3s;
      &:last-child {
        margin-left: auto;
      }
      &:hover {
        background-color: ${({ theme }) => theme.colors.main_lighter};
      }
    }

    a,
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      cursor: pointer;

      height: 100%;
      padding: 0 2rem;

      color: inherit;
    }

    button {
      font-size: inherit;
      border: none;
      background: none;
      width: 100%;
      margin-right: 5rem;
    }
  }

  > button {
    display: none;
    height: 33px;
    width: 4rem;
    margin: 0 8rem;

    border: none;
    background-color: transparent;

    flex-direction: column;

    align-items: center;
    justify-content: center;
    /* justify-content: space-between; */

    margin-left: auto;
    transform: translateY(${({ showMenu }) => (showMenu ? "0" : "1rem")});

    border-top: 1px solid white;
    border-color: ${({ showMenu }) => (showMenu ? "transparent" : "white")};

    transition: all 0.4s;

    line-height: 10px;

    &::before,
    &::after {
      content: "";
      display: block;
      width: 100%;
      border-top: 1px solid white;

      transition: all 0.4s ease-out;
    }

    &::before {
      transform: translateY(${({ showMenu }) => (showMenu ? "5.5px" : "0")})
        rotate(${({ showMenu }) => (showMenu ? "45deg" : "0")});
      transform-origin: 50% 0 0;
    }
    &::after {
      transform: translateY(${({ showMenu }) => (showMenu ? "-5.5px" : "0")})
        rotate(${({ showMenu }) => (showMenu ? "-45deg" : "0")});
      transform-origin: 50% 0 0;
    }
  }

  @media screen and (max-width: 800px) {
    /* z-index: 10; */
    > button {
      display: flex;
      margin-right: 2rem;
    }

    border-bottom: 1px solid ${({ theme }) => theme.colors.main_darker};

    overflow-x: hidden;

    ul {
      /* display: none; */

      /* display: ${({ showMenu }) => (showMenu ? "block" : "none")}; */

      /* opacity: 0; */

      /* border-top: 1px solid ${({ theme }) => theme.colors.main_darker}; */

      display: block;

      position: absolute;
      right: 0;
      bottom: -8rem;
      flex: none;
      width: 20rem;

      flex-direction: column;

      background-color: ${({ theme }) => theme.colors.main};

      transition: all 0.4s ease-out;
      translate: ${({ showMenu }) => (showMenu ? "0" : "100%")};

      /* transform: translateX(${({ showMenu }) =>
        showMenu ? "0" : "100%"}); */

      opacity: ${({ showMenu }) => (showMenu ? "1" : "0")};
      /* visibility: ${({ showMenu }) => (showMenu ? "hidden" : "unset")}; */

      li {
        height: 5rem;
        transition: all 0.2s 0.2s ease-out;
        translate: ${({ showMenu }) => (showMenu ? "0" : "50rem")};
      }
    }
  }
`;

const Main = styled.main`
  transition: all 0.4s;
  filter: blur(${({ showMenu }) => (showMenu ? "3px" : "0")});
`;

export default function Root() {
  const [showMenu, setShowMenu] = useState(false);
  const { user, isAdmin, logout } = useAuthContext();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <MainNavStyled showMenu={showMenu}>
        <img src={Logo} alt="Quizly logo" />
        <p>{user?.email || "ANONYMOUS"}</p>
        <button value={showMenu} onClick={() => setShowMenu((b) => !b)}>
          &nbsp;
        </button>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* {user && ( */}
          <li>
            <Link to="/user/test">Test</Link>
          </li>
          {/* )} */}
          {user && isAdmin && (
            <li>
              <Link to="/admin/addQuestion">Add Question</Link>
            </li>
          )}

          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {user && (
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          )}
        </ul>
      </MainNavStyled>
      <Main showMenu={showMenu}>
        <Outlet />
      </Main>
    </>
  );
}
