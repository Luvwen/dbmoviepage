import { render, screen } from '@testing-library/react';
import { Modal } from './Modal';

describe('tests in Modal component', () => {
    const fav = '❤️';
    const unFav = '🖤';
    test('should show "Agregada a Favoritos"', () => {
        render(<Modal fav={fav} />);
        expect(screen.getByText('Agregada a Favoritos')).toBeTruthy();
    });

    test('should show "Quitada de Favoritos', () => {
        render(<Modal fav={unFav} />);
        expect(screen.getByText('Quitada de Favoritos')).toBeTruthy();
    });
});
