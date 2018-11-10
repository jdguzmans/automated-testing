import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem, Col, Row } from 'reactstrap'

const axios = require('axios')

class ViewScreenshots extends Component {
  constructor (props) {
    super(props)
    this.items = []
    this.state = { activeIndex: 0 }
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.goToIndex = this.goToIndex.bind(this)
    this.onExiting = this.onExiting.bind(this)
    this.onExited = this.onExited.bind(this)
    this.getImage = this.getImage.bind(this)
  }

  async getImage () {
    const id = this.props.match.params.id

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reportsE2E/${id}`)

    let items = []

    for (var i = 0; i < data.screenshotsLength; i++) {
      items.push({
        src: `${process.env.REACT_APP_FS_URL}/e2e/screenshot/${id}/${i + 1}.png`,
        altText: 'Screenshot ' + i,
        caption: 'Screenshot ' + i
      })
    }

    return items
  }

  async componentDidMount () {
    const items = await this.getImage()
    this.items = items
  }

  onExiting () {
    this.animating = true
  }

  onExited () {
    this.animating = false
  }

  next () {
    if (this.animating) return
    const nextIndex = this.state.activeIndex === this.items.length - 1 ? 0 : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous () {
    if (this.animating) return
    const nextIndex = this.state.activeIndex === 0 ? this.items.length - 1 : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
  }

  goToIndex (newIndex) {
    if (this.animating) return
    this.setState({ activeIndex: newIndex })
  }

  render () {
    const { activeIndex } = this.state

    const slides2 = this.items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img className='d-block w-100 imgReport' src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} />
        </CarouselItem>
      )
    })

    let content = 'Esta prueba no contiene screenshots'
    if (slides2 !== '') {
      content = <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
        <CarouselIndicators items={this.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides2}
        <CarouselControl direction='prev' directionText='Previous' onClickHandler={this.previous} />
        <CarouselControl direction='next' directionText='Next' onClickHandler={this.next} />
      </Carousel>
    }

    return (
      <div className='animated fadeIn'>
        <Row>
          <Col xs='12' xl='2' />
          <Col xs='12' xl='8'>
            <Card>
              <CardHeader>
                <i className='fa fa-align-justify' /><strong>Screenshots</strong>
              </CardHeader>
              <CardBody>
                {content}
              </CardBody>
            </Card>
          </Col>
          <Col xs='12' xl='2' />
        </Row>
      </div>
    )
  }
}

export default ViewScreenshots
