import React from 'react'
import { Slider, Row, Col } from 'antd';

const IntegerStep = (props) => {
  
  return (
    <div>
      <Row>
      <Col style={{marginTop: '10px'}} span={3}><strong>min</strong></Col>
      <Col span={10}>
        <Slider
          min={1}
          max={50}
          onChange={props.sliderCountChange}
        />
      </Col>
      <Col style={{marginTop: '10px'}}span={3}><strong>max</strong></Col>
    </Row>
  </div>
  );
}


export default IntegerStep