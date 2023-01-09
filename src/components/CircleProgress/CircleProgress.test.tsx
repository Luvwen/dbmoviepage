import { render, screen } from '@testing-library/react';
import { CircleProgress } from './CircleProgress';

describe('tests in CircleProgress component', () => {
    const vote = 65;

    test('should appear the vote percent', () => {
        render(<CircleProgress vote={vote} />);
        const circleDiv = screen.getByText(`${vote}%`);
        expect(circleDiv.innerHTML).toBe(`${vote}%`);
    });

    test('should match the snapshot', () => {
        const { container } = render(<CircleProgress vote={vote} />);
        expect(container).toMatchSnapshot();
    });
});
