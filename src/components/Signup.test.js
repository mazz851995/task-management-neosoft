import React from 'react';
// import { render, screen, cleanup } from '@testing-library/react';
import { shallow } from 'enzyme'
import Signup from "./Signup"
configure({ adapter: new Adapter() })
describe("SignUp", () => {
    it("Signup test", () => {

        const getByText = shallow(<Signup />);
        // const linkEle = getByText(/Username/i);
        // expect(linkEle).toBeInTheDocument()
    })
})