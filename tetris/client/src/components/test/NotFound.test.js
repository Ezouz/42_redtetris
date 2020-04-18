import React from 'react'
import { shallow } from 'enzyme';
import NotFound from '../NotFound';
import toJson from "enzyme-to-json";

describe('<NotFound/> Component', () => {
  it('rendering correctly NotFound', () => {
    let wrapper = shallow(
      <NotFound></NotFound>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});