import React from 'react';
import { shallow, mount } from 'enzyme';
import LeaderBoard from '../LeaderBoard';

const score = {
  player_name: "eva",
  score: "40"
};

describe('<LeaderBoard/> Component', () => {
  it('renders without crashing', () => {
    let wrapper = shallow(
      <LeaderBoard />
    )
    expect(wrapper.html()).toMatchSnapshot()
  });
  it('Should have 3 divs', () => {
    const container = mount(
      <LeaderBoard />
    );
    expect(container.find('div').length).toEqual(3);
  });
});