import { useEffect, useState } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = (props) => {
  const [comments, setcomments] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [isError, setisError] = useState(false)

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }

  const funzione = async () => {
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' + props.asin,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzRmNDY1ODc0Yjc3ZDAwMTVkM2YxNGIiLCJpYXQiOjE3MzMyNDg2MDAsImV4cCI6MTczNDQ1ODIwMH0.T_LCWtiC2iojc-3HhGTTvvM3UnvsD0wwMYr6v8qrETg',
          },
        }
      )
      console.log(response)
      if (response.ok) {
        let comments = await response.json()

        setcomments(comments)
        setisLoading(false)
        setisError(false)
      } else {
        setisLoading(false)
        setisError(true)
      }
    } catch (error) {
      console.log(error)
      setisLoading(false)
      setisError(true)
    }
  }
  useEffect(() => {
    if (props.asin !== null) {
      funzione()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.asin])

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  )
}

export default CommentArea
