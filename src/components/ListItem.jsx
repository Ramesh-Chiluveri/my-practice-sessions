import React from 'react'

const ListItem = React.memo((props) => {
  return (
    <li>{props?.item?.name}</li>
  )
});

export default ListItem
