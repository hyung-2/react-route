import './App.css';
import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Home, About, Post, NotFound } from './pages' 
//폴더 이름만 적어주면 폴더안의 index.js파일을 찾고 index파일 안의 페이지들을 꺼내옴
// index.js가 없으면 import Home from './pages/Home' 이런식으로 3번써야함 -> index.js 쓰면 1줄로 작성 가능

import Menu from './components/Menu'
import Sidebar from './components/Sidebar';
import Button from './components/Button';


class App extends Component{
  homeMenu = [
    {url: '/', name: 'HOME'},
    {url: '/about', name: 'ABOUT'},
    {url: '/posts', name: 'POST'},
  ]
  state= {
    open: false
  }

  showSidebar = () => {
    this.setState({open: !this.state.open})
  }

  render(){
    const { open } = this.state
    return(
      <div className='App'>
        <Button handleClick={this.showSidebar}>메뉴</Button>
        <Sidebar open={open}>
          <Menu menus={this.homeMenu}/>
        </Sidebar>
        <Routes>
          <Route exact path="/" element={<Home/>}/> 
          {/* exact path 경로로 정확히 들어왔을때 element 실행 */}
          <Route exact path="/about" element={<About/>}/> 
          <Route path = '/posts' element={<Post/>}>
            <Route path=':postId' element={<Post/>} /> {/* 중첩routes (/posts/:postId) */}
          </Route>
          <Route path="*" element={<NotFound/>}/> 
          {/* exact path가 아닌 모든 경로는 NotFound페이지 */}
        </Routes>
      </div>
    )
  }
}

export default App;
