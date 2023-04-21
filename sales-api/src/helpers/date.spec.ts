import { isDateValid } from './date'

describe('isDateValid', () => {
    describe('when date is valid', () => {
        it('should return true', () => {
            expect(isDateValid(new Date())).toBeTruthy()
        })
    })
    describe('when is NOT a valid date', () => {
        it('should return false', () => {
            expect(isDateValid(new Date('12a3'))).toBeFalsy()
        })
        it('should return false because month is not valid', () => {
            expect(isDateValid(new Date('2022-22-03 20:23:37'))).toBeFalsy()
        })
        it('should return false because day is not valid', () => {
            expect(isDateValid(new Date('2022-12-33 20:23:37'))).toBeFalsy()
        })
    })
})