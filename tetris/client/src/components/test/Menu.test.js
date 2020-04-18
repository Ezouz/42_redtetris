import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';
import Menu from '../Menu';
import NotFound from '../NotFound';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('RouteMenu', () => {
  it('Redirects to correct URL on click', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={[ '/' ]}>
        <Menu />
      </MemoryRouter>,
    );
    expect(wrapper.find(Menu)).toHaveLength(1);
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });

//   it('Should have room input', () => {
//     const { getByPlaceholderText } = render(
//       <MemoryRouter initialEntries={[ '/' ]}>
//         <Menu />
//       </MemoryRouter>,
//     );
//     expect(getByPlaceholderText('ROOM')).toMatchObject({
//       placeholder:'ROOM', type:'text'})
//   });

//   it('Should have player input', () => {
//     const { getByPlaceholderText } = render(
//       <MemoryRouter initialEntries={[ '/' ]}>
//         <Menu />
//       </MemoryRouter>,
//     );
//     expect(getByPlaceholderText('PLAYER')).toMatchObject({
//       placeholder:'PLAYER', type:'text'})
//   });

//   it('Should have button', () => {
//     const { getByRole } = render(
//       <MemoryRouter initialEntries={[ '/' ]}>
//         <Menu />
//       </MemoryRouter>,
//     );
//     const mockSubmit= jest.fn();
//     getByRole('button').goToRoom = mockSubmit;
//     getByRole('button').goToRoom();
//     fireEvent.click(getByRole('button'));
//     expect(mockSubmit).toHaveBeenCalled();
//   });

//   it('Button should be disabled', () => {
//     const wrapper = mount(
//       <MemoryRouter initialEntries={['/']}>
//         <Menu />
//       </MemoryRouter>,
//     );
//     const submitButton = wrapper.find('button');
//     submitButton.simulate('click');
//     expect(submitButton.prop('disabled')).toBe(true);
//   });

//   it('Input change for player name', () => {
//     const wrapper = mount(
//       <MemoryRouter initialEntries={['/']}>
//         <Menu />
//       </MemoryRouter>,
//     );
//     const formName = wrapper.find('input[placeholder="PLAYER"]');
//     formName.simulate('change', { target: { value: 'EVA' } });
//     expect(wrapper.find('input[placeholder="PLAYER"]').prop('value')).toBe('EVA');
//   });

//   it('Input change for room nb', () => {
//     const wrapper = mount(
//       <MemoryRouter initialEntries={['/']}>
//         <Menu />
//       </MemoryRouter>,
//     );
//     const formRoom = wrapper.find('input[placeholder="ROOM"]');
//     formRoom.simulate('change', { target: { value: '123' } });
//     expect(wrapper.find('input[placeholder="ROOM"]').prop('value')).toBe('123');
//   });

//   it('Input change enable submit', () => {
//     let leaveRoom = jest.fn();
//     const wrapper = mount(
//       <MemoryRouter initialEntries={['/']}>
//         <Menu leaveRoom={leaveRoom} />
//       </MemoryRouter>,
//     );
//     const formRoom = wrapper.find('input[placeholder="ROOM"]');
//     formRoom.simulate('change', { target: { value: '123' } });
//     expect(wrapper.find('input[placeholder="ROOM"]').prop('value')).toBe('123');
//     const formName = wrapper.find('input[placeholder="PLAYER"]');
//     formName.simulate('change', { target: { value: 'EVA' } });
//     expect(wrapper.find('input[placeholder="PLAYER"]').prop('value')).toBe('EVA');
//     const submitButton = wrapper.find('button');
//     submitButton.simulate('click');
//     expect(submitButton.prop('disabled')).toBe(false);
//     expect(leaveRoom).toHaveBeenCalled();
//   });
// });