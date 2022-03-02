import React from 'react'
import { Card, Image } from 'antd'

export default function MovieItem({ item, showDetailMovie }) {
  return (
    <Card
      onClick={() => showDetailMovie(item)}
      hoverable
      style={{ width: "100%" }}
      cover={
        <Image
          width={"100%"}
          height={400}
          src={item.Poster}
        />
      }
    >
      <Card.Meta title={item.Title} description={`${item.Year} (${item.Type})`} />
    </Card>
  )
}
