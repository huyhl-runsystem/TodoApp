import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import SideBar from './Sidebar';

export default function Home() {
    const { isLoading } = useSelector((state: RootState) => state.login);
  
    return (
      <h2>Home page</h2>
    );
  }
  