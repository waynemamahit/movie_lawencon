import { Alert, Card, Col, Image, Input, Layout, message, Modal, Pagination, Row, Spin } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import './App.css'
import MovieItem from './components/MovieItem'
import {
  selectState,
  updateMovies
} from './features/movieSlice'
import { fallbackImage } from './utils'

const { Header, Content, Footer} = Layout;

window['keyword'] = ""

function App() {
  const dispatch = useDispatch();
  const movieState = useSelector(selectState)
  const [totalData, setTotalData] = useState(0)
  const [loading, setLoading] = useState(false)
  const [detailModal, setDetailModal] = useState(false)
  const [detailMovie, setDetailMovie] = useState(null)
  
  const getMovies = async (page = 1) => {
    setLoading(true)
    
    try {
      if (window['keyword'].length === 0) return

      let response = await axios.get(`https://www.omdbapi.com?apikey=715289b&s=${window['keyword']}&page=${page}`)
      response = await response.data

      if (response.Response === "False") throw response.Error
      
      dispatch(updateMovies(response.Search))
      
      setTotalData(Number(response.totalResults))

    } catch (error) {

      message.error(error || "Something went wrong!")
    
    } finally {

      setLoading(false)
    }
  }

  const onSearch = async (value) => {
    window['keyword'] = value
    getMovies()
  }
  
  const onChangePage = async (page) => {
    getMovies(page)
  }
  
  const showDetailMovie = async (item) => {
    setDetailModal(true)
    setDetailMovie(item)
  }

  return (
    <Layout className="layout">
      <Header>
        <div className='logo'>LAWENCON</div>
        <div className='header-nav'>
          <Input.Search placeholder="Search movie here" style={{marginTop: 10}} size='large' onSearch={onSearch} enterButton />
        </div>
      </Header>
      <Content style={{ padding: '20px 40px' }}>
        <div className="site-layout-content">
          <Spin spinning={loading} size="large">
            {movieState.data.length > 0 ? (
              <>
                <Pagination
                  style={{
                    margin: "auto"
                  }}
                  showQuickJumper
                  defaultCurrent={1}
                  total={totalData}
                  onChange={onChangePage}   
                />
                <Row gutter={[16, 16]} justify="center" style={{ marginTop: 20}}>
                  {movieState.data.map((movieItem, movieIndex) => (
                    <Col xs={12} sm={12} md={8} lg={6} xl={6} key={movieIndex}>
                      <MovieItem item={movieItem} showDetailMovie={showDetailMovie} />
                    </Col>
                  ))}
                </Row>
              </>
            ) : (
              <Alert
                banner
                message="Find your favorite movies here!"
                description="Use our search field to get our best movies."
                type="info"
                showIcon
              />
            )}
          </Spin>
          <Modal visible={detailModal} onOk={() => setDetailModal(false)} onCancel={() => setDetailModal(false)}>
            {detailMovie && (
              <Card
                hoverable
                style={{ width: "100%" }}
                cover={
                  <Image
                    width={"100%"}
                    height={500}
                    src={detailMovie.Poster}
                    fallback={fallbackImage}
                  />
                }
              >
                <Card.Meta
                  title={detailMovie.Title}
                  description={`${detailMovie.Year} (${detailMovie.Type})`}
                />
                <span>IMDB_ID : {detailMovie.imdbID}</span>
              </Card>
            )}
          </Modal>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©{ new Date().getFullYear( )} Created by Nusantara IT Developer (Waney Mamahit)</Footer>
    </Layout>
  );
}

export default App;
