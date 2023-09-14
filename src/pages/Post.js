import React from 'react'
import { useParams, NavLink, useSearchParams, useLocation } from 'react-router-dom' 
/* url 파라미터 넣기,  Link대신 NavLink를 쓰면 스타일링까지 가능 */
import posts from '../PostData'
import './Post.css'


function Post(){
  const params = useParams() // params 객체 : url 파라미터 정보 들어있음(useParams호출하면)
  const [searchParams, setSearchParams] = useSearchParams() //[객체(조회), 함수(쿼리스트링을 변경)]

  const applyAcitveColor = ({ isActive }) => (
    isActive ? {color: 'orangered', background: 'yellow'} : {}
  )
  const changeQueryString = (e) => {
    const filter = e.target.value 
    if(filter){
      setSearchParams({filter}) // 화면에 보여지는 쿼리스트링값(filter) : filter(e.target.value), 
    }else{
      setSearchParams({}) //객체니까 빈 객체를 넣어서 쿼리스트링 제거
    }
  }
  //쿼리스트링을 포함한 URL 주소를 유지해주는 컴포넌트 
  const QueryNavLink = ({ to, children, ...props}) => { //여기에서 쓰지않는 props들을 ...props로 묶어줌
    const location = useLocation() // location 객체 반환
    console.log(location)
    return <NavLink to={to+location.search} {...props}>{children}</NavLink> //to={to + 쿼리스트링추가(location.search에있음)}
  }
  //필터링된 블로그 목록
  const postFiltered = posts.filter(post => {
    const filter = searchParams.get('filter') //사용자 검색 키워드
    if(!filter) return true //true로 주면 모든 블로그 포스트가 새 배열에 담기므로 블로그 전체목록 보여줌
    const title = post.title.toLowerCase()
    return title.includes(filter.toLowerCase())
  })
  //위에서필터링된게 posts로 들어옴
  const post = postFiltered[params.postId] //url 파라미터(포스트 ID)로 특정 포스트 선택


  return(
    <>
      {/* 쿼리스트링을 이용한 검색 */}
      <br/>
      <input 
        className='filter-post' 
        placeholder='Search post...' 
        onChange={changeQueryString}
        value={searchParams.get('filter') || ''} //searchParams에서 ('filter') 조회 || 없을땐 ''
      />

      {/* //특정 블로그 포스트 내용 */}
      {post ? 
      <div className='post-container'>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <span>{post.created}</span>
      </div>
      :
      <h1>POST PAGE</h1>}

      {/* // 블로그 포스트 전체목록 */}
      {postFiltered
        .map((post, id) => {
        return(
          <QueryNavLink key={id} to={`/posts/${id}`} className='post-item' style={applyAcitveColor}>{post.title}</QueryNavLink>
        )
      })}
    </>
  )
}

export default Post


