import { extractOperationDate, extractOperationType, extractProductDescription, extractProductPrice, extractSellerName } from "./extractDataFromFileLines"

describe('extractDataFromFileLines', () => {
    describe('extractOperationType', () => {
        describe('when operation type is valid', () => {
            it('should extract operation type', () => {
                expect(extractOperationType('42022-01-19T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS')).toBe(4)
                expect(extractOperationType('22022-01-19T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS')).toBe(2)
            })
        })
        describe('when operation type is NOT valid', () => {
            it('should throw an error', () => {
                expect(() => extractOperationType('92022-01-19T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS')).toThrow('Operation type is not valid')
                expect(() => extractOperationType('a2022-01-19T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS')).toThrow('Operation type is not valid')
            })
        })
    })
    describe('extractOperationDate', () => {
        describe('when operation date is valid', () => {
            it('should extract operation type', () => {
                expect(extractOperationDate('42022-01-19T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS')).toBe('2022-01-19T19:20:30-03:00')
                expect(extractOperationDate('22022-11-19T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS')).toBe('2022-11-19T19:20:30-03:00')
            })
        })
        describe('when operation date is NOT valid', () => {
            it('should throw an error', () => {
                expect(() => extractOperationDate('12022-31-19T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS')).toThrow('Operation date is not valid')
                expect(() => extractOperationDate('12022-01-39T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS')).toThrow('Operation date is not valid')
            })
        })
    })
    describe('extractProductDescription', () => {
        describe('when operation description is valid', () => {
            it('should extract operation type', () => {
                expect(extractProductDescription('42022-01-19T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS')).toBe('CURSO DE BEM-ESTAR')
                expect(extractProductDescription('22022-11-19T19:20:30-03:00CURSO DE BEM-ESTAR test       0000012750JOSE CARLOS')).toBe('CURSO DE BEM-ESTAR test')
            })
        })
        describe('when operation description is NOT valid', () => {
            it('should throw an error', () => {
                expect(() => extractProductDescription('12022-11-19T19:20:30-03:00                              0000012750JOSE CARLOS')).toThrow('Missing product description')
            })
        })
    })
    describe('extractProductPrice', () => {
        describe('when product price is valid', () => {
            it('should extract product price', () => {
                expect(extractProductPrice('42022-01-19T19:20:30-03:00CURSO DE BEM-ESTAR            0000032750JOSE CARLOS')).toBe(32750)
                expect(extractProductPrice('22022-11-19T19:20:30-03:00CURSO DE BEM-ESTAR test       0000012750JOSE CARLOS')).toBe(12750)
            })
        })
        describe('when product price is NOT valid', () => {
            it('should throw an error', () => {
                expect(() => extractProductPrice('12022-11-19T19:20:30-03:00                              00000a2750JOSE CARLOS')).toThrow('Product price is not valid')
            })
        })
    })
    describe('extractSellerName', () => {
        describe('when seller name is valid', () => {
            it('should extract product price', () => {
                expect(extractSellerName('42022-01-19T19:20:30-03:00CURSO DE BEM-ESTAR            0000032750JOSE CARLOS')).toBe('JOSE CARLOS')
                expect(extractSellerName('22022-11-19T19:20:30-03:00CURSO DE BEM-ESTAR test       0000012750jean antunes')).toBe('jean antunes')
            })
        })
        describe('when seller name is NOT valid', () => {
            it('should throw an error', () => {
                expect(() => extractSellerName('12022-11-19T19:20:30-03:00                              00000a2750')).toThrow('Seller is missing')
            })
        })
    })
})