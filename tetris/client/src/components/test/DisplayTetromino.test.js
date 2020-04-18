import React from 'react'
import { shallow } from 'enzyme';
import DisplayTetrimino from '../DisplayTetrimino';
import toJson from "enzyme-to-json"

describe('<DisplayTetrimino/> Component', () => {
  it('rendering correctly DisplayTetrimino', () => {
    const tetro = { color: '255, 255, 0', shape: [["O", "0"], ["O", "O"]] };
    let wrapper = shallow(
      <DisplayTetrimino text={'text'} tetro={tetro} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})