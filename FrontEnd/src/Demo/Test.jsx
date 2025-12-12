
import React from 'react'
import {  Navigate, useNavigation } from 'react-router-dom';
import { useAuth } from './DemoAuth';
const {users} = useAuth()

export default function Test() {
      if (!users) return <Navigate to={'/login'} replace /> ;
  return (
    <div>Test</div>
  )
}
