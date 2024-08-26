import React, { useEffect } from 'react'
import useBlogData from '../../Custom-hooks/useBlogData'

const MyBlogs = () => {
  const { getData} = useBlogData()


  useEffect(() => {
 getData()
  }, [])
  
  return (
    <div>MyBlogs</div>
  )
}

export default MyBlogs