import { render } from '@testing-library/react';

import ExampleForm from './ExampleForm';

describe('ExampleForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExampleForm />);
    expect(baseElement).toBeTruthy();
  });
});
