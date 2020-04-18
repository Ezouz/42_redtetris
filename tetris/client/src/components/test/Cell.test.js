import React from 'react'
import { shallow } from 'enzyme';
import Cell from '../Cell';
import toJson from "enzyme-to-json"

describe('<Cell/> Component', () => {
  it('rendering correctly Cell', () => {
    let wrapper = shallow(
      <Cell type='0' color='0, 0, 0' size={1} cell={false} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})