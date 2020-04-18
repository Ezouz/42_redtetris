import React from 'react'
import { shallow } from 'enzyme';
import Alert from '../Alert';
import toJson from "enzyme-to-json";
import { render, fireEvent } from '@testing-library/react';

describe('<Alert/> Component', () => {
  it('rendering correctly Alert', () => {
    let wrapper = shallow(
      <Alert message='alert' turnOffAlert='' />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('turn off alert on click', () => {
    const mockTurnoffAlert = jest.fn();
    const { getByRole } = render(<Alert message='alert' turnOffAlert={mockTurnoffAlert} />);
    fireEvent.click(getByRole('button'));
    expect(mockTurnoffAlert).toHaveBeenCalled();
  })
})