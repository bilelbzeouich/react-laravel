import React from 'react'
import { Helmet } from 'react-helmet'

const BreadCumb = (props) => {
  return (
    <div>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <ol class="breadcrumb my-4">
        <li class="breadcrumb-item  text-theme-light"><a href='/' class="link-dark">Dashboard</a></li>
        <li class="breadcrumb-item active ">{props.title}</li>
      </ol>
    </div>
  )
}

export default BreadCumb