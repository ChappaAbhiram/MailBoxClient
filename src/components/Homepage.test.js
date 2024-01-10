// import { render, screen } from '@testing-library/react';
// import Homepage from './Homepage';

// test('renders homepage component', () => {
//     render(<Homepage />);
//     const textElement = screen.getByText(/Welcome to mail box client/i);
//     console.log(textElement); // Log the text element
//     expect(textElement).toBeInTheDocument();
// });


import { render, screen } from '@testing-library/react';
import Homepage from './Homepage';
import '@testing-library/jest-dom'; 

test('renders homepage component', () => {
    render(<Homepage />);
    const textElement = screen.getByText(/Welcome to mail box client/i);
    
    // Log additional information
    console.log('Rendered component:', screen.debug());
    console.log('Text element:', textElement);

    expect(textElement).toBeInTheDocument();
});
