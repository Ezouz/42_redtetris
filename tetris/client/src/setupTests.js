import '@testing-library/jest-dom/extend-expect';
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "regenerator-runtime/runtime";
import React from "react" ;
React.useLayoutEffect = React.useEffect;

Enzyme.configure({ adapter: new Adapter() });