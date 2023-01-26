import moxios from 'moxios';

import { storeFactory } from '../../test/testUtils';
import { getSecretWord } from './';

describe('getSecretWord', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });
    test('secretWord is returned', async () => {
        const store  = storeFactory();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: 'party',
            });
        });

        // update to test app in Redux / context sections
        const mockSecretWord = jest.fn();
        await getSecretWord(mockSecretWord);
        expect(mockSecretWord).toHaveBeenCalledWith('party');
        
        // store.dispatch(getSecretWord())
        //     .then(() => {
        //         const secretWord = store.getState().secretWord;
        //         expect(secretWord).toBe('party');
        //     });
    });
});